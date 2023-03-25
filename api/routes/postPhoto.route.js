import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createPostPhoto, getAllPostPhoto, getMyPosts, editPost, deletePost } from "../controllers/postPhoto.controller.js"


const router = express.Router();

router.post('/', verifyToken, createPostPhoto)
router.get('/', getAllPostPhoto)
router.get('/my-posts', verifyToken, getMyPosts)
router.put('/my-posts/:id', verifyToken, editPost)
router.delete('/my-posts/:id', verifyToken, deletePost)


export default router;
