import express from "express";
import { deleteUser, getUser, editUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.get("/", verifyToken, getUser);
router.put("/", verifyToken, editUser);
router.delete("/", verifyToken, deleteUser);

export default router;