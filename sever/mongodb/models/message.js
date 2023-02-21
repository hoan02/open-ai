import mongoose from "mongoose";

const Message = new mongoose.Schema({
  from: { type: String, required: true },
  message: { type: String, required: true },
});

const PostSchema = mongoose.model("Message", Message);

export default PostSchema;
