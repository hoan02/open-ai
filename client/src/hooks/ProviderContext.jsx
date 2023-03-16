import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const Contexts = createContext({});

export const ProviderContext = ({ children }) => {
  // is mobile view
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

  // Navbar color
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState(null);
  const colors = [
    { path: "/", color: null },
    { path: "/chatgpt", color: "#202123" },
    { path: "/login", color: "#831dbf" },
    { path: "/register", color: "#831dbf" },
    { path: "/user", color: "#831dbf" },
    { path: "/dalle", color: "#00ff00" },
    { path: "/blog", color: "#909111" },
    { path: "/about", color: "#902111" },
  ];

  useEffect(() => {
    const colorObj = colors.find((obj) => obj.path === location.pathname);
    if (colorObj) {
      setNavbarColor(colorObj.color);
    } else {
      setNavbarColor(null);
    }
  }, [location]);

  return (
    <Contexts.Provider value={{ isMobile, navbarColor }}>
      {children}
    </Contexts.Provider>
  );
};
