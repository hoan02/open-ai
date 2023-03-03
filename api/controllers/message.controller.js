import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { openai } from "../sever.js";

export const createMessage = async (req, res, next) => {
  try {
    const newMessageUser = {
      conversationId: req.params.id,
      role: "user",
      content: req.body.content,
    };
    

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.content,
      max_tokens: 500,
      temperature: 0.8,
    });

    const newMessageAssistant = {
      conversationId: req.params.id,
      role: "assistant",
      content: response.data.choices[0].text,
    };
    res.status(201).json(newMessageAssistant);
    await Message.create(newMessageUser);
    await Message.create(newMessageAssistant);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
