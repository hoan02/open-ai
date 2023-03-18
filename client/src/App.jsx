import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ChatGpt from "./pages/chatgpt/ChatGpt";
import Dalle from "./pages/dalle/Dalle";
import Blog from "./pages/blog/Blog";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import { ProviderContext } from "./hooks/ProviderContext";
import GeneratePhoto from "./pages/generatePhoto/GeneratePhoto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <ToastContainer autoClose={2000} />;
      </ProviderContext>
    </QueryClientProvider>
  </div>
);

export default App;
