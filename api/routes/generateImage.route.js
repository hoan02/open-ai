import express from "express";
import {generateImage} from "../controllers/generateImage.controller.js"
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, generateImage);

export default router;