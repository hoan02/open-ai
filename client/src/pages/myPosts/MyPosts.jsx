import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toastService from "../../utils/toastService.js";
import TextareaAutosize from "react-textarea-autosize";

import "./MyPosts.scss";
import BackTo from "../../components/backTo/BackTo";
import newRequest from "../../utils/newRequest";
import Post from "../../components/post/Post";
import iconClose from "../../assets/images/close.png";

const MyPosts = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isShowEdit, setIsShowEdit] = useState(false);

  const [form, setForm] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (post) => {
    setIsShowEdit(true);
    setForm(post);
    navigate(`${post._id}`);
  };

  const handleClose = () => {
    setIsShowEdit(false);
    navigate(`/blog/my-posts`);
  };

  // Get all posts
  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await newRequest.get(`/dalle/my-posts`);
      return response.data.reverse();
    },
  });

  // Update a post
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const postId = form._id;
    updateMutation.mutate(postId);
  };

  const updateMutation = useMutation({
    mutationFn: (postId) => {
      const newForm = { ...form };
      return newRequest.put(`/dalle/my-posts/${postId}`, newForm);
    },
    onSuccess: () => {
      toastService.success("Update a post successfully!");
      queryClient.invalidateQueries(["posts"]);
      setIsShowEdit(false);
      navigate(`/blog/my-posts`);
    },
  });

  // Delete a post
  const handleDelete = (postId) => {
    deleteMutation.mutate(postId);
  };

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return newRequest.delete(`/dalle/my-posts/${postId}`);
    },
    onSuccess: () => {
      toastService.success("Delete successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <div className="myPosts">
      <div className="container">
        {isShowEdit ? (
          <div className="showEdit">
            <div className="headerEdit">
              <div className="titleEdit">Edit post:</div>
              <img
                className="iconClose"
                src={iconClose}
                onClick={handleClose}
              />
            </div>
            <form className="form" onSubmit={handleSubmitEdit}>
              <div className="leftForm">
                <img src={form.photoUrl} alt="" />
              </div>
              <div className="rightForm">
                <div className="item">
                  <label>Title:</label>
                  <TextareaAutosize
                    className="input"
                    value={form.title}
                    name="title"
                    minRows={1}
                    maxRows={4}
                    onChange={handleChange}
                  />
                </div>
                <div className="item">
                  <label>Description:</label>
                  <TextareaAutosize
                    className="input"
                    value={form.desc}
                    name="desc"
                    minRows={4}
                    maxRows={30}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSubmitEdit}>Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="renderPost">
            {allPosts?.map((post, index) => {
              return (
                <div className="wrapPost" key={post._id}>
                  <div className="subPost">
                    <span className="edit" onClick={() => handleEdit(post)}>
                      Edit
                    </span>
                    <span
                      className="delete"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </span>
                  </div>
                  <Post {...post} idColor={index % 5} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BackTo />
    </div>
  );
};

export default MyPosts;
