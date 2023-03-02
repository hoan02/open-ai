import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    userId: req.body.userId,
    title: req.body.title,
  });
  
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          ...{ title: req.body.title },
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const conversation = await Conversation.findOneAndDelete({
      _id: id,
    });
    if (!conversation) return next(createError(404, "Conversation not found!"));
    const messages = await Message.deleteMany({ conversationId: id });
    if (!messages) return next(createError(404, "Messages not found!"));
    res.status(200).json({ message: "Deleted chat successfully!" });
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
