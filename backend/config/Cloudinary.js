const cloudinary = require('cloudinary').v2;
const fs = require("fs");

const uploadCloudinary = async (imageURL) => {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(imageURL);
    
    if (fs.existsSync(imageURL)) {
      fs.unlinkSync(imageURL);
    }

    return uploadResult.secure_url;
  } catch (error) {
    if (fs.existsSync(imageURL)) {
      fs.unlinkSync(imageURL);
    }
    console.error("Upload failed:", error);
    return null;
  }
};

module.exports = {uploadCloudinary};
