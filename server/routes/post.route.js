const {
  getAllPosts,
  createPost,
  getAllPostUsingId,
  likePost,
} = require("../controllers/post.controller")

const router = require("express").Router()

router.route("/all").get(getAllPosts)
router.route("/new").post(createPost)
router.route("/:userId").get(getAllPostUsingId)
router.route("/like/:postId").post(likePost)
module.exports = router
