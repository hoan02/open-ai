import React from "react";
import "./ChatGpt.scss";

import TextareaAutosize from "react-textarea-autosize";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";

const ChatGpt = () => {
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
          {/* chat */}
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

          <div className="chat-input-holder">
            <TextareaAutosize
              maxRows={10}
              className="chat-input-textarea"
              placeholder="Type your message here"
            ></TextareaAutosize>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatGpt;
