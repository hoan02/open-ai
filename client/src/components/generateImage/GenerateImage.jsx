import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerateImage.scss";

const GenerateImage = () => {
  return (
    <div className="generateImage">
      <div className="titleGenerate">
        <span>Start with a detailed description</span>
        <button className="btnSurprise">Surprise me</button>
      </div>
      <div className="generate">
        <input className="input" type="text" />
        <button className="btnGenerate">Generate</button>
      </div>
    </div>
  );
};

export default GenerateImage;
