import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import Message from "../mongodb/models/message.js";

dotenv.config();

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const prompt = req.body.message;
    const user = {
      from: "user",
      message: prompt,
    };

    await Message.create(user);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.8,
    });

    const bot = {
      from: "bot",
      message: response.data.choices[0].text,
    };

    const newMessage = await Message.create(bot);
    res.status(200).json({ succes: true, data: newMessage });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a message, please try again",
    });
  }
});

export default router;
