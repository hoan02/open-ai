import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./Dalle.scss";
import GenerateImage from "../../components/generateImage/GenerateImage";
import newRequest from "../../utils/newRequest";
import Loader from "../../components/Loader";

// const fetchPosts = async () => {
//   const response = await newRequest.get("/post");

//   return response.data.reverse();
// };

const fetchPosts = async () => {
  const response = await fetch(
    `https://dalle-ai-14x7.onrender.com/api/v1/post`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.data.reverse();
};

const filterPosts = (posts, searchText) => {
  return posts.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchText.toLowerCase())
  );
};

const Dalle = () => {
  const [searchText, setSearchText] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, data: allPosts } = useQuery(["posts"], fetchPosts);

  const searchedResults = filterPosts(allPosts || [], searchText);

  const { mutate: deletePost } = useMutation(
    async (postId) => {
      await newRequest.delete(`/post/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteClick = (postId) => {
    deletePost(postId);
  };

  console.log(allPosts);

  return (
    <div className="dalle">
      <div className="header">
        <div className="title">The Community Showcase</div>
        <div className="subTitle">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </div>
      </div>
      <div className="search">
        <input
          className="input"
          type="text"
          placeholder="Search somethings"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        <div className="mainContainer">
          <div className="renderCard">
            {isLoading ? (
              <p>Loading...</p>
            ) : searchedResults.length > 0 ? (
              <h1>ok</h1>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dalle;
