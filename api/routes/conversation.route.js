import express from "express";
import {
  createConversation,
  getConversations,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.put("/", verifyToken, updateConversation);
router.delete("/:id", verifyToken, deleteConversation);

export default router;
