import React from "react";
import moment from 'moment';

import "./Post.scss";
import avt from "../../assets/images/avt-user.jpg";

const Post = (props) => {
  const timeAgo = moment(props.updatedAt).fromNow();
  const colors = ["green", "blue", "red", "yellow", "orange"];
  let color = colors[props.idColor];

  return (
    <div className={`post ${color}`}>
      <div className="headerPost">
        <div className="avatar">
          <img src={avt} alt="" />
        </div>
        <div className="creator">
          <p>{props.creator}</p>
          <span className="time">{timeAgo}</span>
        </div>
      </div>
      <div className="postBody">
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

export default Post;
