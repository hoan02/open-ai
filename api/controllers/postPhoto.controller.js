import createError from "../utils/createError.js";
import PostPhoto from "../models/postPhoto.model.js";
import { cloudinary } from "../server.js"

export const createPostPhoto = async (req, res, next) => {
  const photo_url = await (await cloudinary.uploader.upload(req.body.photo)).secure_url;

  const newPostPhoto = new PostPhoto({
    userId: req.userId,
    creator: req.body.creator,
    title: req.body.title,
    prompt: req.body.prompt,
    desc: req.body.desc,
    photoUrl: photo_url,
  });

  try {
    const savedPost = await newPostPhoto.save();
    res.status(201).send(savedPost);
  } catch (err) {
    next(err);
  }
};


export const getMyPosts = async (req, res, next) => {
  try {
    const postPhoto = await PostPhoto.find({ userId: req.userId });
    res.status(200).send(postPhoto);
  } catch (err) {
    next(createError(500, "Fetching posts failed, please try again"));
  }
};

export const editPost = async (req, res, next) => {
  const idPost = req.params.id;
  try {
    const updatePost = await PostPhoto.findByIdAndUpdate(idPost,
      {
        title: req.body.title,
        desc: req.body.desc,
      }
    );
    res.status(200).send(updatePost);
  } catch (err) {
    next(createError(500, "Update post failed, please try again"));
  }
};

export const deletePost = async (req, res, next) => {
  const idPost = req.params.id;
  try{
    await PostPhoto.findByIdAndDelete(idPost)
    res.status(200).send("Delete post successfully!");
  } catch (err) {
    next(createError(500, "Update post failed, please try again"));
  }
};


export const getAllPostPhoto = async (req, res, next) => {
  try {
    const postPhoto = await PostPhoto.find({});
    res.status(200).json({ data: postPhoto });
  } catch (err) {
    next(createError(500, "Fetching posts failed, please try again"));
  }
};

