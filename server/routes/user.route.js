const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserProfileData,
  followUser,
} = require("../controllers/user.controller")
const verifyAuth = require("../middlewares/verifyAuth")

const router = require("express").Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
router.route("/users/allusers").get(verifyAuth, getAllUsers)
router.route("/users/:userId").get(verifyAuth, getUserProfileData)
router.route("/users/follow/:followId").post(verifyAuth, followUser)

module.exports = router
