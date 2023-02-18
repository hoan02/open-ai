import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../assets/images/logo.svg";
import btnMenu from "../../assets/images/btn-menu.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" className="filter-white" />
          </div>
        </Link>
        <div className="menu-nav">
          <Link to="/chatgpt" className="link">
            <span>CHAT GPT</span>
          </Link>
          <Link to="/dalle" className="link">
            <span>DALL-E</span>
          </Link>
          <Link to="/about" className="link">
            <span>ABOUT</span>
          </Link>
        </div>

        <div className="menu-nav-mobile">
          <img src={btnMenu} alt="" className="filter-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
