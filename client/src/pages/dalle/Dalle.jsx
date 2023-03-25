import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import { TypeAnimation } from "react-type-animation";

import "./Dalle.scss";
import avtLogo from "../../assets/images/dalle-header.png";
import robot from "../../assets/images/robot.png";
import bgrRobot from "../../assets/images/bgrRobot.gif";
import BackTo from "../../components/backTo/BackTo";
import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService.js";
import Card from "../../components/card/Card";

import "swiper/css";
import "swiper/css/effect-cards";

const Dalle = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await newRequest.get(`/dalle`);
      return response.data.data.reverse();
    },
  });

  const handleClickGenerate = () => {
    if (!currentUser) {
      toastService.info("You must be logged in to continue!");
      navigate("/login");
      return;
    }
    navigate(`generate`);
  };

  return (
    <div className="dalle">
      <div className="header">
        <div className="headerLeft">
          <div className="title">DALL·E 2</div>
          <div className="subTitle">
            <TypeAnimation
              sequence={[
                "DALL·E 2 is an AI system that can create realistic images and art from a description in natural language.",
                2000,
                "Express your creativity with AI's amazing imagination.",
                2000,
                "You can create images of nature",
                1000,
                "You can create images of animals",
                1000,
                "You can create images of people",
                1000,
                "You can create images of anything...",
                2000,
                "You can create images of anything... Let's start now!",
                2000,
              ]}
              speed={60}
            />
          </div>
          <button onClick={handleClickGenerate}>➥ Try DALL·E</button>
        </div>
        <div className="headerRight">
          <img src={avtLogo} alt="" />
        </div>
      </div>

      <div className="featured" style={{ backgroundImage: `url(${bgrRobot})` }}>
        <div className="imgRobot">
          <img src={robot} alt="robot" />
          <div className="slider">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {allPosts?.slice(0, 6).map((post) => {
                return (
                  <SwiperSlide key={post._id}>
                    <Card {...post} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="container"></div>
      </div>
      <BackTo />
      <BackTo value={800} />
    </div>
  );
};

export default Dalle;
