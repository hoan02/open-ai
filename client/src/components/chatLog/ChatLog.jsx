import React from "react";

import "./ChatLog.scss";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";

const ChatLog = ({ ...chatLog }) => {
  const isAssistant = chatLog.role === "assistant";

  return (
    <div className={isAssistant ? "chatLog bot" : "chatLog"}>
      <div className="chatMessage">
        <div className="avatar">
          <img src={isAssistant ? avtBot : avtUser} alt="" />
        </div>
        <p>{chatLog.content}</p>
      </div>
    </div>
  );
};

export default ChatLog;
