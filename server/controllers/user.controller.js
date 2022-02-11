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

const userLabelUpdate = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req
  const { label } = req.body
  const userFromDb = await User.findById(userId)
  if (!userFromDb) {
    return next(new ErrorHandler("User not found", 404))
  }
  userFromDb.labels = userFromDb.labels.filter((item) => item !== label)

  userFromDb.labels.push(label)
  const updatedUser = await userFromDb.save()
  res.status(200).json({
    success: true,
    labels: updatedUser.labels,
  })
})
module.exports = { signupUser, loginUser, userLabelUpdate }
