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
    { path: "/chatgpt", color: "#202123" },
    { path: "/login", color: "#831dbf" },
    { path: "/register", color: "#831dbf" },
    { path: "/my-account", color: "#831dbf" },
    { path: "/dalle", color: "#400040" },
    { path: "/blog", color: "#008811" },
    { path: "/about", color: "#902111" },
  ];

  useEffect(() => {
    const colorObj = colors.find((obj) =>
      location.pathname.startsWith(obj.path)
    );
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
