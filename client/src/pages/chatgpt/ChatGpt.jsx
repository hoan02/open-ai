import React, { useState, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./ChatGpt.scss";
import iconSub from "../../assets/images/icon-letter-air.png";
import iconCheck from "../../assets/images/check.png";
import iconDelete from "../../assets/images/delete.png";
import ChatLog from "../../components/chatLog/ChatLog";
import { Contexts } from "../../hooks/ProviderContext";
import newRequest from "../../utils/newRequest";
import TypingEffect from "../../hooks/TypingEffect";

const ChatGpt = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isMobile } = useContext(Contexts);
  const [inputMessage, setInputMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");

  // Create a new Conversation
  const createConversationMutation = useMutation({
    mutationFn: (conversation) => {
      return newRequest.post("/chatgpt/conversations", conversation);
    },
    onSuccess: (data) => {
      const newConversationId = data.data._id;
      navigate(`/chatgpt/${newConversationId}`);
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleCreateConversation = () => {
    createConversationMutation.mutate({
      userId: currentUser._id,
      title: newConversationTitle,
    });
    setNewConversationTitle("");
    setOpen(false);
  };

  // Delete a conversation
  const deleteMutation = useMutation({
    mutationFn: (conversationId) => {
      return newRequest.delete(`/chatgpt/conversations/${conversationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleDeleteConversation = (conversation) => {
    deleteMutation.mutate(conversation._id);
    navigate("/chatgpt");
  };

  const {
    isLoading: isLoadingConversations,
    error: errorConversations,
    data: dataConversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/chatgpt/conversations`).then((res) => {
        return res.data;
      }),
  });

  //Get messages
  const {
    isLoading: isLoadingMessages,
    error: errorMessages,
    data: dataMessages,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/chatgpt/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = (conversationId) => {
    navigate(`/chatgpt/${conversationId}`);
  };

  // Create a new message
  const createMessageMutation = useMutation({
    mutationFn: (message) => {
      console.log(message);
      return newRequest.post(`/chatgpt/messages/${id}`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleCreateMesage = () => {
    createMessageMutation.mutate({
      content: inputMessage,
    });
    setInputMessage("");
  };

  console.log(dataMessages);

  return (
    <div className="chatgpt">
      <div className="container">
        {isMobile ? (
          <></>
        ) : (
          <div className="conversations">
            <div className="newConversation">
              <div className="conversation">
                {open ? (
                  <>
                    <input
                      type="text"
                      placeholder="Nhập tiêu đề"
                      value={newConversationTitle}
                      onChange={(e) => setNewConversationTitle(e.target.value)}
                    />
                    <div className="icon">
                      <img src={iconCheck} onClick={handleCreateConversation} />
                    </div>
                  </>
                ) : (
                  <div className="text" onClick={() => setOpen(true)}>
                    ✚ New Chat
                  </div>
                )}
              </div>
            </div>
            <div className="renderConversations">
              {isLoadingConversations ? (
                <div className="conversation">
                  <div>
                    <TypingEffect inputText="Loading..." />
                  </div>
                </div>
              ) : errorConversations ? (
                <div className="conversation">
                  <div>
                    <TypingEffect inputText="Error..." />
                  </div>
                </div>
              ) : (
                dataConversations.map((conversation) => (
                  <div className="conversation" key={conversation._id}>
                    <div
                      className="text"
                      onClick={() => handleContact(conversation._id)}
                    >
                      {conversation.title.length > 15
                        ? conversation.title.slice(0, 15) + "..."
                        : conversation.title}
                    </div>
                    <div className="icon">
                      <img
                        className="filter-white"
                        src={iconDelete}
                        onClick={() => handleDeleteConversation(conversation)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <section className="chatBox">
          {isLoadingMessages ? (
            <div className="conversation">
              <div className="notice">
                <TypingEffect inputText="Loading..." />
              </div>
            </div>
          ) : errorMessages ? (
            <div className="conversation">
              <div className="notice">
                <TypingEffect inputText="Error..." />
              </div>
            </div>
          ) : dataMessages.length === 0 ? (
            <div className="notice">
              <TypingEffect inputText="Welcome to Chat GPT!!!" />
            </div>
          ) : (
            dataMessages.map((message) => {
              return <ChatLog key={message._id} typing={false} {...message} />;
            })
          )}

          <div
            className="chatInputContainer"
            style={{ width: isMobile ? "100%" : "calc(100% - 260px)" }}
          >
            <div className="chatInputHolder">
              <TextareaAutosize
                minRows={1}
                maxRows={15}
                className="chatInputTextarea"
                placeholder="Type your message here"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <img src={iconSub} alt="" onClick={handleCreateMesage} />
            </div>
            <p className="title">
              Chat bot dựa trên model "text-davinci-003" của OpenAI API
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatGpt;
