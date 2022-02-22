const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserProfileData,
  followUser,
  getFollowers,
  getFollowings,
} = require("../controllers/user.controller")
const verifyAuth = require("../middlewares/verifyAuth")

const router = require("express").Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
router.route("/users/allusers").get(verifyAuth, getAllUsers)
router.route("/users/:userId").get(verifyAuth, getUserProfileData)
router.route("/users/follow/:followId").post(verifyAuth, followUser)
router.route("/users/followers/:userId").get(verifyAuth, getFollowers)
router.route("/users/followings/:userId").get(verifyAuth, getFollowings)

module.exports = router
