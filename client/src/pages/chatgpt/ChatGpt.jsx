import React, { useState, useEffect, useContext, useMemo } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import "./ChatGpt.scss";
import iconSub from "../../assets/images/icon-letter-air.png";
import iconCheck from "../../assets/images/check.png";
import iconDelete from "../../assets/images/delete.png";
import iconContact from "../../assets/images/contact.png";
import ChatLog from "../../components/chatLog/ChatLog";
import { Contexts } from "../../hooks/ProviderContext";
import newRequest from "../../utils/newRequest";
import { TypeAnimation } from "react-type-animation";
import toastService from "../../utils/toastService.js";

const ChatGpt = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isMobile } = useContext(Contexts);
  const [inputMessage, setInputMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const isHome = location.pathname === "/chatgpt";

  const knowledge_cutoff = "2021-09-01";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const current_date = `${year}-${month}-${day}`;

  if (!currentUser) {
    navigate("/login");
  }

  const systemMessage = {
    role: "system",
    content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: ${knowledge_cutoff} Current date: ${current_date}`,
  };

  // Clear conversations
  const handleClearConversation = async () => {
    await newRequest.delete(`/chatgpt/conversations`);
    toastService.success("Deleted conversations successfully!");
    navigate(`/chatgpt/`);
  };

  // Create a new Conversation
  const createConversationMutation = useMutation({
    mutationFn: (conversation) => {
      return newRequest.post(`/chatgpt/conversations`, conversation);
    },
    onSuccess: (data) => {
      const newConversationId = data.data._id;
      navigate(`/chatgpt/${newConversationId}`);
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleCreateConversation = () => {
    if (newConversationTitle === "") return setOpen(false);
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

  // Get the message
  const handleContact = (conversationId) => {
    navigate(`/chatgpt/${conversationId}`);
  };

  const {
    isLoading: isLoadingMessages,
    error: errorMessages,
    data: dataMessages,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest
        .get(`/chatgpt/messages/${id}`)
        .then((res) => {
          setMessages(res.data);
          return res.data;
        })
        .catch((error) => {
          console.log("Error fetching messages:", error);
          return null;
        }),
    enabled: Boolean(id),
  });

  // Create a new message
  const createMessageUser = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/chatgpt/messages/${id}`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const createMessageAssistant = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/chatgpt/messages/${id}`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleCreateMessage = () => {
    if (id === undefined || inputMessage === "") return;
    const userMessage = { role: "user", content: inputMessage };
    createMessageUser.mutate({
      sender: "user",
      data: userMessage,
    });
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = (chatMessage) => {
    const apiMessages = chatMessage.reduce((acc, obj) => {
      acc.push({ role: obj.role, content: obj.content });
      return acc;
    }, []);
    const assistantMessage = {
      sender: "assistant",
      data: [systemMessage, ...apiMessages],
    };
    createMessageAssistant.mutate(assistantMessage);
  };

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
                    <TypeAnimation sequence={["Loading...", 1000, ""]} />
                  </div>
                </div>
              ) : errorConversations ? (
                <div className="conversation">
                  <div className="text">
                    <TypeAnimation sequence={["Error...", 1000, ""]} />
                  </div>
                </div>
              ) : (
                dataConversations.slice(0, 10).map((conversation) => (
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
            <div className="subLeft">
              <div className="item">
                <img className="filter-white" src={iconDelete} />
                <div className="titleItem" onClick={handleClearConversation}>
                  Clear conversations
                </div>
              </div>
              <div className="item">
                <img className="filter-white" src={iconContact} />
                <div className="titleItem">
                  <a
                    className="link"
                    href="https://www.facebook.com/hoan.ann69/"
                    target="_blank"
                  >
                    Contact developer
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="chatBox">
          {isHome ? (
            <div className="notice">
              <TypeAnimation sequence={["Error...", 1000, ""]} cursor={false} />
            </div>
          ) : isLoadingMessages ? (
            <div className="notice">
              <TypeAnimation sequence={["Loading...", 1000, ""]} cursor={false}/>
            </div>
          ) : errorMessages ? (
            <div className="notice">
              <TypeAnimation sequence={["Loading...", 1000, ""]} cursor={false}/>
            </div>
          ) : dataMessages.length ? (
            dataMessages.map((message) => {
              return <ChatLog key={message._id} {...message} />;
            })
          ) : (
            <div className="notice">
              <TypeAnimation sequence={["Chatbot is ready...", 1000, ""]} cursor={false}/>
            </div>
          )}

          <div
            className="chatInputContainer"
            style={{ width: isMobile ? "100%" : "calc(100% - 260px)" }}
          >
            {isHome ? (
              <div className="noticeBottom">
                <TypeAnimation
                  sequence={[
                    "Chat bot dựa trên model 'gpt-3.5-turbo' của OpenAI API",
                    1000,
                    "",
                  ]}
                  cursor={false}
                />
              </div>
            ) : (
              <>
                <div className="chatInputHolder">
                  <TextareaAutosize
                    minRows={1}
                    maxRows={15}
                    className="chatInputTextarea"
                    placeholder="Type your message here"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <img src={iconSub} alt="" onClick={handleCreateMessage} />
                </div>
                <p className="title">
                  Chat bot dựa trên model "gpt-3.5-turbo" của OpenAI API
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatGpt;
