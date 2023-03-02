import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ChatGpt from "./pages/chatgpt/ChatGpt";
import Dalle from "./pages/dalle/Dalle";
import Whisper from "./pages/whisper/Whisper";
import Blog from "./pages/blog/Blog";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import { ProviderContext } from "./hooks/ProviderContext";

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
            <Route path="/dalle" element={<Dalle />} />
            <Route path="/whisper" element={<Whisper />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </ProviderContext>
    </QueryClientProvider>
  </div>
);

export default App;
