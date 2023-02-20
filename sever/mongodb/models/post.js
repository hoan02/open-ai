import mongoose from "mongoose";

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
