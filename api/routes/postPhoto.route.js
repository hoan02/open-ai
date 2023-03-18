import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createPostPhoto, getAllPostPhoto } from "../controllers/postPhoto.controller.js"


const router = express.Router();

router.post('/', verifyToken, createPostPhoto)
router.get('/', getAllPostPhoto)

export default router;
