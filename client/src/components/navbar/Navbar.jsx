import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../assets/images/logo.svg";
import avtUser from "../../assets/images/avt-user.jpg";
import btnMenu from "../../assets/images/btn-menu.png";
import { Contexts } from "../../hooks/ProviderContext";
import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService";

const Navbar = () => {
  const menuItems = [
    { path: "/chatgpt", title: "CHAT GPT" },
    { path: "/dalle", title: "DALL·E 2" },
    { path: "/blog", title: "BLOG" },
    { path: "/about", title: "ABOUT" },
  ];

  const { isMobile, navbarColor } = useContext(Contexts);
  const [open, setOpen] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentUser);

  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      toastService.success("Logout Success!");
      navigate("/");
    } catch (err) {
      toastService.error(err);
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

        <span className="sep">|</span>
        <div className="menu-nav">
          {isMobile ? (
            <div className="menu-nav-mobile">
              <img
                src={btnMenu}
                alt=""
                className="filter-white"
                onClick={() => setOpenLinks(!openLinks)}
              />
            </div>
          ) : (
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
          )}
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
      </div>
      {isMobile && openLinks && (
        <div className="options">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              className="link"
              key={item.path}
              onClick={() => {
                setOpenLinks(!openLinks);
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
