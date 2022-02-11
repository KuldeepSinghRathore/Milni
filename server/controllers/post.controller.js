const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { Post } = require("../models/post.model")

const createPost = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req
  const { description } = req.body
  if (!description) {
    return next(new Error("Description is required", 400))
  }
  const newPost = new Post({
    ...req.body,
    userId,
  })
  const post = await newPost.save()
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  })
})

const getAllPosts = catchAsyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("userId")
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    posts,
  })
})
const getAllPostUsingId = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req
  const posts = await Post.find({ userId })
  if (!posts) {
    return next(new Error("No post found", 404))
  }
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    posts,
  })
})

module.exports = { getAllPostUsingId, getAllPosts, createPost }
