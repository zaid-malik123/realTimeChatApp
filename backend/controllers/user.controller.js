const User = require("../models/user.model");
const {uploadCloudinary} = require("../config/Cloudinary")

module.exports.currentUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Current user error: ${error.message}` });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }
    const updateData = { name };
    if (image) {
      updateData.image = image;
    }
    const user = await User.findByIdAndUpdate(req.user, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user.toObject());
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Profile error: ${error.message}` });
  }
};

module.exports.getOtherUser = async (req, res, next)=>{
try {
  const users = await User.find({_id: {$ne: req.user} }).select("-password")
  return res.status(200).json(users)
} catch (error) {
  return res
      .status(500)
      .json({ message: `get All Users error: ${error.message}` });
} 

}

module.exports.search = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }, 
      ],
    }).select("-password"); 

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Search user error: ${error.message}` });
  }
};