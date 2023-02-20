import React, { useState, useEffect } from "react";
import "./App.scss";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import ChatGpt from "./pages/chatgpt/ChatGpt";
import Dalle from "./pages/dalle/Dalle";
import Whisper from "./pages/whisper/Whisper";
import Blog from "./pages/blog/Blog";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="app">
      <Navbar isMobile={isMobile} className="navbar" />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatgpt" element={<ChatGpt isMobile={isMobile}/>} />
          <Route path="/dalle" element={<Dalle />} />
          <Route path="/whisper" element={<Whisper />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
