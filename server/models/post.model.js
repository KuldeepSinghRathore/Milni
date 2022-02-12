const refferenceValidator = require("mongoose-referrence-validator")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
})

PostSchema.plugin(refferenceValidator)

const Post = mongoose.model("Post", PostSchema)
module.exports = { Post }
