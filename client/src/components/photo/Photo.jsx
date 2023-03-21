import React from "react";
import { useNavigate } from "react-router-dom";
import "./Photo.scss";

const Photo = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog`);
  };

  return (
    <div className="photo">
      <div className="container">
        <a href={props.photoUrl} target="_blank">
          <img src={props.photoUrl} alt={props.title} />
        </a>
        <div className="content">
          <div className="creator">@{props.creator}</div>
          <div className="title">{props.title}</div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
