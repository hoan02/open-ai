import React from "react";
import TypingEffect from "../../hooks/TypingEffect";

import "./ChatLog.scss";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";

const ChatLog = ({ typing, ...chatLog }) => {
  const isAssistant = chatLog.role === "assistant";

  return (
    <div className={isAssistant ? "chatLog bot" : "chatLog"}>
      <div className="chatMessage">
        <div className="avatar">
          <img src={isAssistant ? avtBot : avtUser} alt="" />
        </div>
        {typing && isAssistant ? (
          <TypingEffect className="message" inputText={chatLog.content} />
        ) : (
          <p>{chatLog.content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatLog;
