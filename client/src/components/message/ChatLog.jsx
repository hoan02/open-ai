import React from "react";
import TypingEffect from "../../hooks/TypingEffect";

import "./ChatLog.scss";
import avtBot from "../../assets/images/avt-bot.jpg";
import avtUser from "../../assets/images/avt-user.jpg";

const ChatLog = ({typing, ...chatLog}) => {
  const isBot = chatLog.from === "bot";

  return (
    <div className={isBot ? "chatLog bot" : "chatLog"}>
      <div className="chatMessage">
        <div className="avatar">
          <img src={isBot ? avtBot : avtUser} alt="" />
        </div>
        {typing ? (
          <TypingEffect className="message" inputText={chatLog.message} />
        ) : (
          <p>{chatLog.message}</p>
        )}
      </div>
    </div>
  );
};

export default ChatLog;
