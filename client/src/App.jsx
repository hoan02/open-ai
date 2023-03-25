import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import { ProviderContext } from "./global/ProviderContext";
import ChatGpt from "./pages/chatgpt/ChatGpt";
import Dalle from "./pages/dalle/Dalle";
import GeneratePhoto from "./pages/generatePhoto/GeneratePhoto";
import Blog from "./pages/blog/Blog";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyAccount from "./pages/myAccount/MyAccount";
import MyPosts from "./pages/myPosts/MyPosts";

const queryClient = new QueryClient();

const App = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <ProviderContext>
        <Navbar className="navbar" />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatgpt" element={<ChatGpt />} />
            <Route path="/chatgpt/:id" element={<ChatGpt />} />
            <Route path="/dalle" element={<Dalle />} />
            <Route path="/dalle/generate" element={<GeneratePhoto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/my-posts" element={<MyPosts />} />
            <Route path="/blog/my-posts/:id" element={<MyPosts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Routes>
        </div>
        <ToastContainer autoClose={2000} draggablePercent={60} />
      </ProviderContext>
    </QueryClientProvider>
  </div>
);

export default App;
