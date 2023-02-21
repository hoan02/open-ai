import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

import "./ChatGpt.scss";
import iconSub from "../../assets/images/icon-letter-air.png";
import ChatLog from "../../components/message/ChatLog";

const HOST = "http://localhost:8080/api/chatgpt";

const RenderChatLogs = ({ data }) => {
  if (data?.length > 0) {
    return data.map((chatLog) => <ChatLog key={chatLog._id} {...chatLog} />);
  }

  return <ChatLog />;
};

const ChatGpt = (props) => {
  const [message, setMessage] = useState("");
  const [allChatLogs, setAllChatLogs] = useState({});

  // GET chat logs
  const fetchChatLogs = async () => {
    try {
      const response = await axios.get(`${HOST}/`);
      setAllChatLogs(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchChatLogs();
  }, []);

  // console.log(allChatLogs.data)
  // END GET

  // POST
  const handleSubmit = async () => {
    if (message.trim() === "") return;
    try {
      const response = await axios.post(`${HOST}/`, {
        message: message,
      });
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  // END POST

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
          <RenderChatLogs data={allChatLogs.data} />

          <div
            className="chatInputContainer"
            style={{ width: props.isMobile ? "100%" : "calc(100% - 260px)" }}
          >
            <div className="chatInputHolder">
              <TextareaAutosize
                minRows={1}
                maxRows={10}
                className="chatInputTextarea"
                placeholder="Type your message here"
                value={message}
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
