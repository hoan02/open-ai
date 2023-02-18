import React from "react";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ReactPlayer from "react-player";

const Home = () => {
  return (
    <BrowserRouter>
      <div className="home">
        <Navbar />
        <div className="main">
          <div className="container">
            <ReactPlayer
              className="player-bg"
              url="https://www.youtube.com/watch?v=yWDUzNiWPJA"
              playing={true}
              loop={true}
              volume={0}
              muted={true}
              width="100%"
              height="100%"
            />

            <div className="wrapper">
              <span className="title">
                Join us in shaping the future of technology.
              </span>
              <div className="btn">
                <Link
                  to="https://www.youtube.com/watch?v=yWDUzNiWPJA"
                  className="link"
                  target="_blank"
                >
                  <span className="btn-video">➤ WATCH VIDEO</span>
                </Link>
                <Link to="/careers" className="link">
                  <span className="btn-view">VIEW CAREERS ▶</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Home;
