const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../middleware/multer");
const upload = multer({ storage: storage });

const UserController = require("../controllers/user.controller");
const isAuth = require("../middleware/isAuth");

router.get("/current", isAuth, UserController.currentUser);

router.put("/profile", isAuth, upload.single("image"), UserController.editProfile);

router.get("/others", isAuth, UserController.getOtherUser)

router.get("/search", isAuth, UserController.search)

module.exports = router;
