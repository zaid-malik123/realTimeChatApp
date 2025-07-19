const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { uploadCloudinary } = require("../config/Cloudinary");
const { io, getRecieverSocketId } = require("../socket/socket");

// controller --------------------------------------------------
module.exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user;
    const { reciever } = req.params;
    const { message } = req.body;

    // 1. optional image upload
    let image;
    if (req.file) {
      try {
        image = await uploadCloudinary(req.file.path);
      } catch (err) {
        console.log("❌ Cloudinary Error:", err);
      }
    }

    // 2. conversation lookup
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    });

    // 3. create message doc
    const newMessage = await Message.create({
      sender,
      reciever,
      message,
      image,
    });

    // 4. create / update conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, reciever],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // 5. emit to receiver if online
    const recieverSocketId = getRecieverSocketId(reciever);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMsg", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("🔥 sendMessage server error:", error);   //  <-- real log
    return res.status(500).json({ message: "send message error" });
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const sender = req.user;
    const { reciever } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    }).populate("messages")
    if(!conversation){
        return res.status(400).json({message: "conversation not found"})
    }
    return res.status(200).json(conversation?.messages)
  } catch (error) {
    res.status(500).json({ message: "get message error" });
  }
};

// module.exports.delete = async (req, res, next)=>{
// await Message.deleteMany({})
// res.status(200).json({messgae: "deleted Successfully"})
// }