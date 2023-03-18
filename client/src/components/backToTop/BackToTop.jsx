import React, { useState } from "react";
import "./BackToTop.scss";
import backToTop from "../../assets/images/back-to-top.png";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Xử lý sự kiện khi người dùng bấm nút
  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Xử lý sự kiện khi trang web được cuộn
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Đăng ký sự kiện khi thành phần được tải lần đầu tiên
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <img
      src={backToTop}
      className={`backToTop ${isVisible ? "visible" : ""}`}
      onClick={handleBackToTopClick}
    />
  );
}

export default BackToTop;
