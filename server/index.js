const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
//import routes
const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route")
const { connectDb } = require("./database/connectDb")
const errorMiddleware = require("./middlewares/error")
const verifyAuth = require("./middlewares/verifyAuth")

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`)
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down Server...")
  process.exit(1)
})

dotenv.config()
app.use(morgan("common"))
app.use(express.json())

app.use(cors())
// connecting to the database
connectDb()

// routes
app.use("/api/v1", userRouter)
app.use("/api/v1/posts", verifyAuth, postRouter)
// error handling middleware
// Generic error middleware

app.use(errorMiddleware)
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)

  console.log(`Shutting down server due to unhandled promise rejection`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
