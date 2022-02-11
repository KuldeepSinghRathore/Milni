const mongoose = require("mongoose")
const isEmail = require("validator/lib/isEmail")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],

      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    website: {
      type: String,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("User", UserSchema)
module.exports = { User }
