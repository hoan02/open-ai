import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../assets/images/logo.svg";
import btnMenu from "../../assets/images/btn-menu.png";

const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" className="filter-white" />
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
            <Link to="/chatgpt" className="link">
              <span>CHAT GPT</span>
            </Link>
            <Link to="/dalle" className="link">
              <span>DALL·E 2</span>
            </Link>
            <Link to="/whisper" className="link">
              <span>WHISPER</span>
            </Link>
            <Link to="/blog" className="link">
              <span>BLOG</span>
            </Link>
            <Link to="/about" className="link">
              <span>ABOUT</span>
            </Link>
          </div>
        )}
      </div>
      {props.isMobile && open && (
        <div className="options">
          <Link to="/chatgpt" className="link">
            <span>CHAT GPT</span>
          </Link>
          <Link to="/dalle" className="link">
            <span>DALL·E 2</span>
          </Link>
          <Link to="/whisper" className="link">
            <span> WHISPER</span>
          </Link>
          <Link to="/blog" className="link">
            <span>BLOG</span>
          </Link>
          <Link to="/about" className="link">
            <span>ABOUT</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
