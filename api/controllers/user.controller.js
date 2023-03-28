import { cloudinary } from "../server.js"
import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const getUser = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  res.status(200).send(user);
};

export const editUser = async (req, res, next) => {
  const userId = req.userId;
  console.log(req.avatar);
  let newUser = {
    email: req.body.email,
    country: req.body.country,
    phone: req.body.phone,
    desc: req.body.desc,
  }
  if(req.body.avatar) {
    const avatarUrl = await (await cloudinary.uploader.upload(req.body.avatar)).secure_url;
    newUser = { ...newUser, avatar: avatarUrl}
  }
  try {
    const updateUser = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).send(updateUser);
  } catch (err) {
    next(createError(500, "Update user failed, please try again!"));
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send("Deleted.");
  } catch (err) {
    next(createError(500, "Delete user failed, please try again!"));
  }
};