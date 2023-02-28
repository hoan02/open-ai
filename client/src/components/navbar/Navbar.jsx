import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../assets/images/logo.svg";
import avtUser from "../../assets/images/avt-user.jpg";
import btnMenu from "../../assets/images/btn-menu.png";
import { Contexts } from "../../hooks/ProviderContext";
import newRequest from "../../utils/newRequest";

const HOST = "http://localhost:8080/api";

const Navbar = () => {
  const menuItems = [
    { path: "/chatgpt", title: "CHAT GPT" },
    { path: "/dalle", title: "DALL·E 2" },
    { path: "/whisper", title: "WHISPER" },
    { path: "/blog", title: "BLOG" },
  ];

  const { isMobile, navbarColor } = useContext(Contexts);
  const [open, setOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  const handleLogout = async () => {
    try {
      await newRequest.post(`${HOST}/auth/logout`);
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar" style={{ background: navbarColor }}>
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
        {isMobile ? (
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
            <div className="links">
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
            <div className="auth">
              {currentUser ? (
                <div className="user" onClick={() => setOpen(!open)}>
                  <img src={currentUser.img || avtUser} alt="" />
                  <span>{currentUser?.username}</span>
                  {open && (
                    <div className="options">
                      <Link className="link" to="/user">
                        My account
                      </Link>
                      <Link className="link" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="signIn link">
                    Sign in
                  </Link>
                  <Link className="link" to="/register">
                    <button>Join</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isMobile && open && (
        <div className="options">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              className="link"
              key={item.path}
              onClick={() => {
                setOpen(!open);
                setActiveTitle(item.title);
              }}
            >
              <span className={activeTitle === item.title ? "hover" : ""}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
