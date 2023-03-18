import React from "react";
import "./Card.scss";
import avt from "../../assets/images/avt-user.jpg";

const Card = (props) => {
  const colors = ["green", "blue", "red", "yellow", "orange"];
  let color = colors[props.idColor];

  return (
    <div className={`card ${color}`}>
      <div className="headerCard">
        <div className="avatar">
          <img src={avt} alt="" />
        </div>
        <div className="creator">
          <p>{props.creator}</p>
          <span className="time">12h30</span>
        </div>
      </div>
      <div className="cardBody">
        <div className="photo">
          <img src={props.photoUrl} alt="" />
        </div>
        <div className="content">
          <div className="title">{props.title}</div>
          <div className="desc">{props.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
