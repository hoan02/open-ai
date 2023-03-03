import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { openai } from "../sever.js";

export const createMessage = async (req, res, next) => {
  const isAssistant = req.body.role === "assistant";
  var content = "";
  if (isAssistant) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.content,
      max_tokens: 500,
      temperature: 0.8,
    });
    content = response.data.choices[0].text;
  } else {
    content = req.body.content;
  }
  const newMessage = new Message({
    conversationId: req.params.id,
    role: req.body.role,
    userId: req.userId,
    content: content,
  });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id).exec();
    if (conversation.userId !== req.userId)
      next(createError(403, "Not have access!"));
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
