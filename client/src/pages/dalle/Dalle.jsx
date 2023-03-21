import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";

import "./Dalle.scss";
import avtLogo from "../../assets/images/dalle-header.png";
import robot from "../../assets/images/robot.png";
import bgrRobot from "../../assets/images/bgrRobot.gif";
import BackTo from "../../components/backTo/BackTo";
import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService.js";
import Photo from "../../components/photo/Photo";

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
            Express your creativity with AI's amazing imagination
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
              {allPosts?.map((post) => {
                return (
                  <SwiperSlide key={post._id}>
                    <Photo {...post} />
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
