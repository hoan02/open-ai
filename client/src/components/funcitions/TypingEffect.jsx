import React, { useState, useEffect } from "react";

function TypingEffect({ inputText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setText((prevText) => {
        if (currentIndex >= inputText.length) {
          clearInterval(intervalId);
        }
        currentIndex++;
        return inputText.substring(0, currentIndex);
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [inputText]);

  return <p>{text}</p>;
}

export default TypingEffect;
