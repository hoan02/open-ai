import React, { useEffect, useState } from "react";
import "./BackTo.scss";
import backToTop from "../../assets/images/back-to-top.png";
import downArrow from "../../assets/images/down-arrow.png";

function BackTo(e) {
  const position = e.value ? e.value : 0;
  console.log(position);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleTop, setIsVisibleTop] = useState(false);
  const handleBackToClick = () => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      setIsVisibleTop(true);
    } else {
      setIsVisibleTop(false);
    }

    if (scrollTop < 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return position == 0 ? (
    <img
      src={backToTop}
      className={`backToTop ${isVisibleTop ? "visible" : ""}`}
      onClick={handleBackToClick}
    />
  ) : (
    <img
      src={downArrow}
      className={`backTo ${isVisible ? "visible" : ""}`}
      onClick={handleBackToClick}
    />
  );
}

export default BackTo;
