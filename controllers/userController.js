import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { BadRequest, unAuthRequest } from "../utils/error.js";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 1,
      message: "login successful",
      payload: {
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      },
    });
  } else {
    throw new unAuthRequest("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequest("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      status: 1,
      message: "Registration successful",
      payload: {
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      },
    });
  } else {
    throw new BadRequest("Something went wrong");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      status: 1,
      message: "Registration successful",
      payload: {
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
      },
    });
  } else {
    throw new BadRequest("User not found");
  }
});

export { loginUser, registerUser, updateUserProfile };
