import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import avtLogo from "../../assets/images/avt-logo.png";
import "./Dalle.scss";
import BackToTop from "../../components/backToTop/BackToTop";
import newRequest from "../../utils/newRequest";

const Dalle = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await newRequest.get(`/dalle`);
      return response.data.data.reverse();
    },
  });

  const searchedResults = allPosts?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickGenerate = () => {
    navigate(`generate`);
  };

  return (
    <div className="dalle">
      <div className="header">
        <div className="headerLeft">
          <div className="title">The Community Showcase</div>
          <div className="subTitle">
            Browse through a collection of imaginative and visually stunning
            images generated by DALL-E AI
          </div>
          <button onClick={handleClickGenerate}>▶ Generate now</button>
        </div>
        <div className="headerRight">
          <img src={avtLogo} alt="" />
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
          {searchText && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing Resuls for{" "}
              <span className="text-[#222328]">{searchText}</span>:
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchedResults?.map((post) => {
              return (
                <div
                  key={post._id}
                  className="card"
                  onClick={() => {
                    navigate(`/post/${post._id}`);
                  }}
                >
                  <div className="card-image">
                    <img src={post.photoUrl} alt="" />
                  </div>
                  <div className="card-content">
                    <div className="card-title">
                      <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </div>
                    <div className="card-text">{post.prompt}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Dalle;
