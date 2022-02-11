const {
  signupUser,
  loginUser,
  userLabelUpdate,
} = require("../controllers/user.controller")
const verifyAuth = require("../middlewares/verifyAuth")

const router = require("express").Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
module.exports = router
