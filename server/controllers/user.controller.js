const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { User } = require("../models/user.model")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
// Signup User

const signupUser = catchAsyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body

  if (!email || !password || !username) {
    return next(new ErrorHandler("Please fill all fields", 400))
  }
  const pass = password.toString()
  if (pass.length < 6) {
    return next(
      new ErrorHandler("Password must be at least 6 characters long", 400)
    )
  }

  const userFromDb = await User.findOne({ email })
  if (userFromDb) {
    return next(new ErrorHandler("User already exists", 400))
  }
  // bcrypt password
  // hashing password
  bcrypt.hash(pass, 10, async (err, hash) => {
    if (err) {
      return next(new ErrorHandler("Cannot create user", 500))
    }
    const newUser = new User({
      username,
      email,
      password: hash,
    })
    // saving New user
    const saveNewUser = await newUser.save()
    //   node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
    // creating token
    const token = jwt.sign(
      { userId: saveNewUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )
    saveNewUser.password = undefined
    saveNewUser.__v = undefined

    res.json({
      success: true,
      message: "User Created Successfully",
      data: {
        user: saveNewUser,
        token,
      },
    })
  })
})

// Login User
const loginUser = catchAsyncHandler(async (req, res, next) => {
  const userFromBody = req.body
  const { email, password } = userFromBody
  if (!userFromBody.email || !userFromBody.password) {
    return next(new ErrorHandler("Please provide email and password", 400))
  }
  userFromBody.password = password.toString()

  // finding user by email
  const userFromDb = await User.findOne({ email }).select("+password")
  if (userFromDb === null) {
    return next(new ErrorHandler("Invalid Email Or Password", 401))
  }
  // comparing password

  const isPasswordMatched = await bcrypt.compare(
    userFromBody.password,
    userFromDb.password
  )
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password is incorrect", 401))
  }
  // creating token
  const token = jwt.sign({ userId: userFromDb._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  userFromDb.password = undefined
  userFromDb.__v = undefined
  return res.status(200).json({
    success: true,
    message: "Login Successful",

    data: {
      user: userFromDb,
      token,
    },
  })
})
const getAllUsers = catchAsyncHandler(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    allUsers: users,
  })
})

const getUserProfileData = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById(userId)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  res.status(200).json({
    success: true,
    message: "User Data fetched successfully",
    userProfileData: user,
  })
})

const followUser = catchAsyncHandler(async (req, res, next) => {
  const { followId } = req.params
  const { userId } = req
  const user = await User.findById(userId)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  const followUser = await User.findById(followId)
  if (!followUser) {
    return next(new ErrorHandler("User not found", 404))
  }

  const isAlreadyFollowed = user.following.find(
    (follow) => follow.toString() === followId.toString()
  )
  const isAlreadyFollowedBy = followUser.followers.find(
    (follow) => follow.toString() === userId.toString()
  )

  if (isAlreadyFollowed || isAlreadyFollowedBy) {
    followUser.followers = followUser.followers.filter(
      (i) => i.toString() !== userId
    )
    user.following = user.following.filter((i) => i.toString() !== followId)
    let updateFollowUser = await followUser.save()
    updateFollowUser = await updateFollowUser.populate("followers")
    let updateUser = await user.save()
    updateUser = await updateUser.populate("following")
    return res.status(200).json({
      success: true,
      message: "User UnFollowed Successfully",
      updateFollowUser,
      updateUser,
    })
  }
  followUser.followers.push(userId)
  user.following.push(followId)
  let updateFollowUser = await followUser.save()
  updateFollowUser = await updateFollowUser.populate("followers")
  let updateUser = await user.save()
  updateUser = await updateUser.populate("following")

  // const followData= await updateFollowUser.populate("followers").execPopulate()

  return res.status(200).json({
    success: true,
    message: "User Followed Successfully",
    updateFollowUser,
    updateUser,
  })
})

module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
  getUserProfileData,
  followUser,
}
