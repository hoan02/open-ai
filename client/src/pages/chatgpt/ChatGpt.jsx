import React, { useState, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./ChatGpt.scss";
import iconSub from "../../assets/images/icon-letter-air.png";
import check from "../../assets/images/check.png";
import ChatLog from "../../components/chatLog/ChatLog";
import { Contexts } from "../../hooks/ProviderContext";
import newRequest from "../../utils/newRequest";

const ChatGpt = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isMobile } = useContext(Contexts);
  const [inputMessage, setInputMessage] = useState("");

  const [isNewConversation, setIsNewConversation] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");

  const handleSubmit = () => {};

  const handleCreateConversation = async (e) => {
    e.preventDefault();
    mutation.mutate({
      userId: currentUser._id,
      title: newConversationTitle,
    });
    setNewConversationTitle("");
    setIsNewConversation(false);
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

  const mutation = useMutation({
    mutationFn: (conversation) => {
      return newRequest.post(`/chatgpt/conversations`, conversation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  return (
    <div className="chatgpt">
      <div className="container">
        {isMobile ? (
          <></>
        ) : (
          <div className="conversations">
            <div className="newConversation">
              <div className="conversation">
                {isNewConversation ? (
                  <>
                    <input
                      type="text"
                      placeholder="Nhập tiêu đề"
                      value={newConversationTitle}
                      onChange={(e) => setNewConversationTitle(e.target.value)}
                    />
                    <img
                      src={check}
                      alt=""
                      onClick={handleCreateConversation}
                    />
                  </>
                ) : (
                  <span onClick={() => setIsNewConversation(true)}>
                    ✚ New Chat
                  </span>
                )}
              </div>
            </div>
            <div className="renderConversations">
              {isLoadingConversations
                ? "loading"
                : errorConversations
                ? "error"
                : dataConversations.map((conversation) => (
                    <div className="conversation" key={conversation._id}>
                      <span>{conversation.title}</span>
                    </div>
                  ))}
            </div>
          </div>
        )}

        <section className="chatBox">
          {/* <div className="lastConv">
            {lastConversation.data?.map((chatLog) => (
              <ChatLog key={chatLog._id} typing={false} {...chatLog} />
            ))}
          </div> */}

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
              <img src={iconSub} alt="" onClick={handleSubmit} />
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
