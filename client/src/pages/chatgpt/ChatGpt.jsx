import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

import "./ChatGpt.scss";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";
import iconSub from "../../assets/images/icon-letter-air.png";

const HOST = "http://localhost:8080/api/chatgpt";

const ChatGpt = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (message.trim() === "") return;
    try {
      const response = await axios.post(`${HOST}/`, {
        message: message,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chatgpt">
      <div className="container">
        <aside className="sidemenu">
          <div className="side-menu-btn">
            <span className="icon-add">✚</span>
            New chat
          </div>
        </aside>

        <section className="chatbox">
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>
          <div className="chat-log bot">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtBot} alt="" />
              </div>
              <div className="message">Hello world!</div>
            </div>
          </div>

          <div className="chat-log">
            <div className="chat-message">
              <div className="avatar">
                <img src={avtUser} alt="" />
              </div>
              <div className="message">Chào bot</div>
            </div>
          </div>

          <div
            className="chat-input-container"
            style={{ width: props.isMobile ? "100%" : "calc(100% - 260px)" }}
          >
            <div className="chat-input-holder">
              <TextareaAutosize
                minRows={1}
                maxRows={10}
                className="chat-input-textarea"
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
