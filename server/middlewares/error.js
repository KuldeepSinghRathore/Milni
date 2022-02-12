const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === "DEVELOPEMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }
    error.message = err.message

    //Wrong Mongoose ObjectId Error
    if (err.name === "CastError") {
      const message = `Resource not found Invalid: ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    // Handle Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message)
      error = new ErrorHandler(message, 400)
    }
    //  Handle JWT Error
    if (err.name === "JsonWebTokenError") {
      const message = "UnAuthorized"
      error = new ErrorHandler(message, 401)
    }
    // handle reference error
    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
      const message = "Duplicate Key Error"
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    })
  }
}
