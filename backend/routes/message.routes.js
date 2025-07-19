const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message.controller");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");
const storage = require("../middleware/multer");
const upload = multer({ storage: storage });

router.post("/send/:reciever", isAuth, upload.single("image"), MessageController.sendMessage);
router.get("/get/:reciever", isAuth, MessageController.getMessage);
// router.delete("/delete", MessageController.delete)
module.exports = router;
