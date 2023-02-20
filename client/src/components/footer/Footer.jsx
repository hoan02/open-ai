import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top-footer">
          <img src={logo} alt="logo" className="filter-white" />
          <span className="sub">© 2015–2023</span>
        </div>

        <div className="mid-footer">
          <div className="col">
            <div className="title">API</div>
            <div className="menu-title">
              <Link to="" className="link">
                Overview
              </Link>
              <Link to="" className="link">
                Pricing
              </Link>
              <Link to="" className="link">
                Examples
              </Link>
              <Link to="" className="link">
                Docs
              </Link>
              <Link to="" className="link">
                Terms & Policies
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="title">BLOG</div>
            <div className="menu-title">
              <Link to="" className="link">
                Overview
              </Link>
              <Link to="" className="link">
                Pricing
              </Link>
              <Link to="" className="link">
                Examples
              </Link>
              <Link to="" className="link">
                Docs
              </Link>
              <Link to="" className="link">
                Terms & Policies
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="title">DOCUMENTATION</div>
            <div className="menu-title">
              <Link to="" className="link">
                Overview
              </Link>
              <Link to="" className="link">
                Pricing
              </Link>
              <Link to="" className="link">
                Examples
              </Link>
              <Link to="" className="link">
                Docs
              </Link>
              <Link to="" className="link">
                Terms & Policies
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="title">INFOMATION</div>
            <div className="menu-title">
              <Link to="" className="link">
                Overview
              </Link>
              <Link to="" className="link">
                Pricing
              </Link>
              <Link to="" className="link">
                Examples
              </Link>
              <Link to="" className="link">
                Docs
              </Link>
              <Link to="" className="link">
                Terms & Policies
              </Link>
            </div>
          </div>
        </div>

        <div className="bot-footer">
          <p className="title">Copyright ©2023 - <a className="link" href="https://github.com/hoan02">HoanIT02</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
