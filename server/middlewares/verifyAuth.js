const jwt = require("jsonwebtoken")
const catchAsyncHandler = require("./catchAsyncHandler")
const verifyAuth = catchAsyncHandler((req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.userId = decoded.userId
  next()
})

module.exports = verifyAuth
