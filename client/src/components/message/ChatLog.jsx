import React from "react";
import "./ChatLog.scss";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";

const ChatLog = (chatLog) => {
  const isBot = chatLog.from === "bot";

  return (
    <div className={isBot? "chatLog bot":"chatLog"}>
      <div className="chatMessage">
        <div className="avatar">
          <img src={isBot ? avtBot : avtUser} alt="" />
        </div>
        <div className="message">{chatLog.message}</div>
      </div>
    </div>
  );
};

export default ChatLog;
