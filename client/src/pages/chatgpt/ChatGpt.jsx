import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

import "./ChatGpt.scss";
import iconSub from "../../assets/images/icon-letter-air.png";
import ChatLog from "../../components/message/ChatLog";

const HOST = "http://localhost:8080/api/chatgpt";

const ChatGpt = (props) => {
  const [input, setInput] = useState("");
  const [lastConversation, setLastConversation] = useState([]);
  const [nextConversation, setNextConversation] = useState([]);

  // GET
  const fetchLastConversation = async () => {
    try {
      const response = await axios.get(`${HOST}`);
      setLastConversation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastConversation();
  }, []);

  // POST
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      message: input,
      from: "user",
    };
    setNextConversation((nextConversation) => [...nextConversation, user]);
    setInput("");
    axios
      .post(`${HOST}`, user)
      .then((response) => {
        const bot = {
          message: response.data.data.message,
          from: "bot",
        };
        setNextConversation((nextConversation) => [...nextConversation, bot]);
      })
      .catch((error) => {
        console.log(error);
        const bot = {
          message: "Đã xảy ra lỗi. Vui lòng thử lại sau!",
          From: "bot",
        };
        setNextConversation((nextConversation) => [...nextConversation, bot]);
      });
  };

  // useEffect(() => {
  //   const right = document.querySelector(".chatBox");
  //   right.scrollTop = right.scrollHeight;
  //   console.log(nextConversation);
  // }, [nextConversation]);

  return (
    <div className="chatgpt">
      <div className="container">
        <aside className="sideMenu">
          <div className="sideMenuBtn">
            <span className="iconAdd">✚</span>
            New chat
          </div>
        </aside>

        <section className="chatBox">
          <div className="lastConv">
            {lastConversation.data?.map((chatLog) => (
              <ChatLog key={chatLog._id} typing={false} {...chatLog} />
            ))}
          </div>
          <div className="nextConv">
            {nextConversation.map((chatLog, index) => (
              <ChatLog key={index} typing={true} {...chatLog} />
            ))}
          </div>
          <div
            className="chatInputContainer"
            style={{ width: props.isMobile ? "100%" : "calc(100% - 260px)" }}
          >
            <div className="chatInputHolder">
              <TextareaAutosize
                minRows={1}
                maxRows={15}
                className="chatInputTextarea"
                placeholder="Type your message here"
                value={input}
                onChange={handleChange}
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
