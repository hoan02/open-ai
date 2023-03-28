import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { v2 as cloudinary } from 'cloudinary';


import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import postPhotoRoute from "./routes/postPhoto.route.js";
import generateImageRoute from "./routes/generateImage.route.js";

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
export { cloudinary }

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/my-account", userRoute);
app.use("/api/chatgpt/conversations", conversationRoute);
app.use("/api/chatgpt/messages", messageRoute);
app.use("/api/dalle", postPhotoRoute);
app.use("/api/dalle/generate", generateImageRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8080, () => {
  connectDB();
  console.log("Backend server is running!");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
