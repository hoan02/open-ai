import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { openai } from "../sever.js";

export const createMessage = async (req, res, next) => {
  const { sender, data } = req.body;
  const isAssistant = sender === "assistant";

  let content = isAssistant
    ? await generateAssistantResponse(data)
    : data.content;

  const newMessage = new Message({
    conversationId: req.params.id,
    userId: req.userId,
    role: sender,
    content,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

const generateAssistantResponse = async (messages) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    throw err;
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
