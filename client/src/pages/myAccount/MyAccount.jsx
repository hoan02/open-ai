import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";
import FileBase64 from "react-file-base64";

import avtUser from "../../assets/images/avt-user.jpg";
import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService.js";

import "./MyAccount.scss";

const MyAccount = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newAvatar, setNewAvatar] = useState("");

  const [form, setForm] = useState({
    userId: currentUser._id,
    username: currentUser.username,
    avatar: currentUser.avatar,
    country: "",
    phone: "",
    email: "",
    desc: "",
  });

  const {
    isLoading: isLoadingData,
    error: errorData,
    data: myAccount,
  } = useQuery({
    queryKey: ["myAccount"],
    queryFn: () =>
      newRequest.get(`/my-account`).then((res) => {
        return res.data;
      }),
    onSuccess: (data) => {
      setForm({
        userId: data._id,
        username: data.username,
        avatar: data.avatar,
        country: data.country,
        phone: data.phone,
        email: data.email,
        desc: data.desc,
      });
    },
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  const updateMutation = useMutation({
    mutationFn: () => {
      const newForm = { ...form, avatar: newAvatar };
      console.log(newForm);
      return newRequest.put(`/my-account`, newForm);
    },
    onSuccess: () => {
      toastService.success("Update account successfully!");
      queryClient.invalidateQueries(["myAccount"]);
      navigate(`/my-account`);
    },
  });

  return (
    <div className="myAccount">
      <div className="container">
        {isLoadingData ? (
          <div>Loading</div>
        ) : errorData ? (
          <div>Error</div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="title">My Account</div>
            <div className="content">
              <div className="left">
                <div className="avatar">
                  <img
                    src={newAvatar || form.avatar || avtUser}
                    alt="avatar"
                  />
                </div>
                <div className="item">
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setNewAvatar(base64)}
                  />
                </div>
                <div className="item">
                  <span className="lable">Id: </span>
                  <span>{form.userId}</span>
                </div>
                <div className="item">
                  <span className="lable">Username: </span>
                  <span>{form.username}</span>
                </div>
              </div>
              <div className="right">
                <div className="item">
                  <div className="lable">Email: </div>
                  <input
                    className="input"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="item">
                  <div className="lable">Country: </div>
                  <input
                    className="input"
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="item">
                  <div className="lable">Phone: </div>
                  <input
                    className="input"
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="item">
                  <div className="lable">Description: </div>
                  <TextareaAutosize
                    className="textarea"
                    name="desc"
                    minRows={8}
                    value={form.desc}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
