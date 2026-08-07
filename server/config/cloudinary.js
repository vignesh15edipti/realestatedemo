const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

let isCloudinaryConfigured = false;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  isCloudinaryConfigured = true;
  console.log('Cloudinary configuration loaded successfully.');
} else {
  console.log('Cloudinary environment variables missing. Server will fallback to local file uploads.');
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
};
