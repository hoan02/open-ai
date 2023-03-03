import React, { useState, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isMobile } = useContext(Contexts);
  const [inputMessage, setInputMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [newMessages, setNewMessages] = useState([]);

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

  // Get all conversations
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

  //Get old messages
  const {
    isLoading: isLoadingOldMessages,
    error: errorOldMessages,
    data: dataOldMessages,
  } = useQuery({
    queryKey: ["oldMessages", id],
    queryFn: () =>
      newRequest.get(`/chatgpt/messages/${id}`).then((res) => {
        return res.data;
      }),
    config: {
      dependencies: [],
    },
  });

  const handleContact = (conversationId) => {
    navigate(`/chatgpt/${conversationId}`);
  };

  // Create a new message
  //
  const handleCreateMesage = async () => {
    try {
      const messageUser = {
        role: "user",
        content: inputMessage,
      };
      setNewMessages((newMessages) => [...newMessages, messageUser]);
      setInputMessage("");
      await newRequest
        .post(`/chatgpt/messages/${id}`, messageUser)
        .then((res) => {
          const messageAssistant = {
            role: "assistant",
            content: res.data.content,
          };
          setNewMessages((newMessages) => [...newMessages, messageAssistant]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(newMessages);

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
                  <div className="text">
                    <TypingEffect inputText="Loading..." />
                  </div>
                </div>
              ) : errorConversations ? (
                <div className="conversation">
                  <div className="text">
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
          {location.pathname === "/chatgpt" ? (
            <div className="notice">
              <TypingEffect inputText="Welcome to ChatGPT..." />
            </div>
          ) : isLoadingOldMessages ? (
            <div className="conversation">
              <div className="notice">
                <TypingEffect inputText="Loading..." />
              </div>
            </div>
          ) : errorOldMessages ? (
            <div className="conversation">
              <div className="notice">
                <TypingEffect inputText="Error..." />
              </div>
            </div>
          ) : dataOldMessages.length === 0 ? (
            <div className="notice">
              <TypingEffect inputText="Chatbot is ready..." />
            </div>
          ) : (
            dataOldMessages.map((message) => {
              return <ChatLog key={message._id} typing={false} {...message} />;
            })
          )}

          {newMessages?.map((message) => {
            return <ChatLog key={message._id} typing={true} {...message} />;
          })}
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
