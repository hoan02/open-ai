import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import "./App.scss";

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
    <div>
      <Home isMobile={isMobile} />
    </div>
  );
};

export default App;
