import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../assets/images/logo.svg";
import btnMenu from "../../assets/images/btn-menu.png";

const Navbar = (props) => {
  const menuItems = [
    { path: "/chatgpt", title: "CHAT GPT" },
    { path: "/dalle", title: "DALL·E 2" },
    { path: "/whisper", title: "WHISPER" },
    { path: "/blog", title: "BLOG" },
    { path: "/about", title: "ABOUT" },
  ];

  const [open, setOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              className="filter-white"
              onClick={() => setActiveTitle("/")}
            />
          </div>
        </Link>
        {props.isMobile ? (
          <div className="menu-nav-mobile">
            <img
              src={btnMenu}
              alt=""
              className="filter-white"
              onClick={() => setOpen(!open)}
            />
          </div>
        ) : (
          <div className="menu-nav">
            {menuItems.map((item) => (
              <Link
                to={item.path}
                className="link"
                key={item.path}
                onClick={() => setActiveTitle(item.title)}
              >
                <span className={activeTitle === item.title ? "hover" : ""}>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
      {props.isMobile && open && (
        <div className="options">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              className="link"
              key={item.path}
              onClick={() => setOpen(!open)}
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
