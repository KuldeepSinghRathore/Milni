const mongoose = require("mongoose")
const connectDb = async () => {
  const response = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  if (response) {
    console.log("Connected To The Sever")
  }
}
module.exports = { connectDb }
