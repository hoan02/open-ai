import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import "./GeneratePhoto.scss";
import preview from "../../assets/images/preview.png";
import loadingImg from "../../assets/images/loading.gif";
import { getRandomPrompt } from "../../utils/getRandomPrompt.js";
import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService.js";
import { TypeAnimation } from "react-type-animation";
import BackToTop from "../../components/backToTop/BackToTop";

const GeneratePhoto = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [form, setForm] = useState({
    creator: currentUser.username,
    title: "",
    desc: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurprise = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleGeneratePhoto = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await newRequest.post(`/dalle/generate`, {
          prompt: form.prompt,
        });
        toastService.success("Generate successful photo!");
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${response.data.photo}`,
        });
      } catch (err) {
        toastService.error(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toastService.warning("Please enter prompt!");
    }
  };
  // console.log(form.photo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo && form.title) {
      setLoading(true);
      const newForm = { ...form };
      try {
        const response = await newRequest.post(`/dalle`, newForm, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toastService.success("Create post successfully!");
        navigate(`/dalle`);
      } catch (err) {
        toastService.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="generatePhoto">
      <div className="container">
        <div className="title">
          <h1>Generate Image</h1>
        </div>
        <div className="subTitle">
          <span>
            Generate an imaginative image through DALL-E AI and share it with
            the community.
          </span>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="titleGenerate">
            <span>Start with a detailed description</span>
            <button className="btnSurprise" onClick={handleSurprise}>
              Surprise me
            </button>
          </div>
          <div className="generate">
            <input
              name="prompt"
              className="input"
              type="text"
              value={form.prompt}
              onChange={handleChange}
            />
            <button
              className={`btnGenerate ${form.prompt !== "" ? "equip" : ""}`}
              onClick={handleGeneratePhoto}
            >
              Generate
              {generatingImg && (
                <TypeAnimation
                  sequence={["...", 1000, ""]}
                  speed={1}
                  cursor={false}
                  repeat={Infinity}
                  omitDeletionAnimation={true}
                />
              )}
            </button>
          </div>

          <div className="containerForm">
            <div className="leftForm">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className="photo" />
              ) : generatingImg ? (
                <img src={loadingImg} alt={form.prompt} className="photo" />
              ) : (
                <img className="preview" src={preview} alt="preview" />
              )}
            </div>

            <div className="rightForm">
              <div className="item">
                <div className="lable">Creator(*):</div>
                <p>{form.creator}</p>
              </div>
              <div className="item">
                <div className="lable">Prompt(*):</div>
                <p>{form.prompt}</p>
              </div>
              <div className="item">
                <div className="lable">Title(*):</div>
                <input type="text" name="title" onChange={handleChange} />
              </div>
              <div className="item">
                <div className="lable">Description:</div>
                <TextareaAutosize
                  minRows={4}
                  maxRows={15}
                  placeholder="Type your description here..."
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div
                className={`share ${form.photo && form.title ? "" : "hide"}`}
              >
                <button type="submit" onClick={handleSubmit}>
                  {loading ? (
                    <>
                      Sharing
                      <TypeAnimation
                        sequence={["...", 1000, ""]}
                        speed={1}
                        cursor={false}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                      />
                    </>
                  ) : (
                    "Share with the Community"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="sample"></div>
      </div>
      <BackToTop />
    </div>
  );
};

export default GeneratePhoto;
