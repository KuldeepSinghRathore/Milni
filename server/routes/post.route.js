const {
  getAllPosts,
  createPost,
  getAllPostUsingId,
} = require("../controllers/post.controller")

const router = require("express").Router()

router.route("/all").get(getAllPosts)
router.route("/new").post(createPost)
router.route("/user").get(getAllPostUsingId)
module.exports = router
