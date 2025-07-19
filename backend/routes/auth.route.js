const express = require("express")
const router = express.Router();
const AuthController = require("../controllers/auth.controller")

router.post("/signup", AuthController.signupController)

router.post("/login", AuthController.loginController)

router.get("/logout", AuthController.logoutController)

module.exports = router;