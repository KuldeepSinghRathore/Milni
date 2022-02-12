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
  let post = await newPost.save()
  post = await post.populate("userId")
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  })
})

const getAllPosts = catchAsyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ _id: -1 }).populate("userId")
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    posts,
  })
})
const getAllPostUsingId = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  if (!userId) {
    return next(new Error("userId is required", 400))
  }
  const posts = await Post.find({ userId }).sort({ _id: -1 }).populate("userId")
  if (!posts) {
    return next(new Error("No post found", 404))
  }
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    userProfilePosts: posts,
  })
})

const likePost = catchAsyncHandler(async (req, res, next) => {
  const { postId } = req.params
  if (!postId) {
    return next(new Error("postId is required", 400))
  }
  const post = await Post.findById(postId)
  if (!post) {
    return next(new Error("No post found", 404))
  }
  const { userId } = req
  const isAlreadyLiked = post.likes.find((like) => like.toString() === userId)

  if (isAlreadyLiked) {
    post.likes = post.likes.filter((like) => like.toString() !== userId)
    const updatedLikes = await post.save()
    return res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      updatedLikes,
    })
  }

  post.likes.push(userId)
  const updatedLikes = await post.save()
  res.status(200).json({
    success: true,
    message: "Post liked successfully",
    updatedLikes,
  })
})

module.exports = { getAllPostUsingId, getAllPosts, createPost, likePost }
