const cloudinary = require("cloudinary").v2;

const { cloudinaryName, cloudinaryKey, cloudinarySecret } = require("./environtment");

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

module.exports = cloudinary;

