import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      expertise: req.body.expertise
    });

    await newUser.save();
    res.status(200).send({
      message: "Registration Successful",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc; // Extract password and isAdmin from user details
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        ...otherDetails,
        message: "Login Successful",
        success: true,
      });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    return res.status(200).cookie("access_token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success:true
    });
  } catch (error) {
    next(error);
  }
};

export const getOtherExperts = async (req, res, next) => {
  try {
    const experts = await User.find({ role: 'expert' });
    return res.status(200).json(experts);
  } catch (error) {
    next(error);
  }
};

export const getOtherStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'user' });
    return res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};
