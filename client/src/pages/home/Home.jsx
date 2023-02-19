import React from "react";
import "./Home.scss";

import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const Home = (props) => {
  return (
    <div className="home">
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
          <div className="coat"></div>
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
    </div>
  );
};

export default Home;