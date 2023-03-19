import React from "react";
import { useNavigate } from "react-router-dom";
import "./Photo.scss";

const Photo = (props) => {
  const colors = ["green", "blue", "red", "yellow", "orange", "purple"];
  let color = colors[props.idColor];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog`);
  };

  return (
    <div className={`photo ${color}`}>
      <div className="container">
        <a href={props.photoUrl} target="_blank">
          <img src={props.photoUrl} alt={props.title} />
        </a>
        <div className="content">
          <h3>@{props.creator}</h3>
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Photo;
