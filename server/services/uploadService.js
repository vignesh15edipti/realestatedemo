const fs = require('fs');
const path = require('path');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

/**
 * Uploads a local file to Cloudinary (if configured) or keeps it as local static asset.
 * @param {Object} file - Multer file object
 * @param {string} hostUrl - Base URL of the API (e.g. http://localhost:5000)
 * @returns {Promise<string>} - The web URL of the uploaded image
 */
const uploadImage = async (file, hostUrl = '') => {
  if (!file) return null;

  if (isCloudinaryConfigured) {
    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'svs_real_estate',
      });
      // Delete temporary local file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return result.secure_url;
    } catch (error) {
      console.error('Failed to upload image to Cloudinary:', error.message);
      // Fallback: If Cloudinary fails, use local path
      console.log('Falling back to local file serving for: ', file.filename);
    }
  }

  // Fallback / Default: return local static URL path
  // E.g., /uploads/image-16275819.jpg
  // Note: we strip the absolute paths to keep URLs relative
  return `/uploads/${file.filename}`;
};

/**
 * Deletes an image. If it's a local file, removes it from the uploads folder.
 * @param {string} imageUrl - Image URL to delete
 */
const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  if (imageUrl.includes('res.cloudinary.com')) {
    if (isCloudinaryConfigured) {
      try {
        // Extract public ID from URL
        // E.g. https://res.cloudinary.com/cloud_name/image/upload/v12345/svs_real_estate/image_id.png
        const parts = imageUrl.split('/');
        const folderIndex = parts.indexOf('svs_real_estate');
        if (folderIndex !== -1 && folderIndex < parts.length - 1) {
          const filename = parts.slice(folderIndex).join('/'); // 'svs_real_estate/image_id.png'
          const publicId = filename.split('.')[0]; // 'svs_real_estate/image_id'
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error.message);
      }
    }
  } else if (imageUrl.startsWith('/uploads/')) {
    try {
      const filepath = path.join(__dirname, '..', imageUrl);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (error) {
      console.error('Failed to delete local file:', error.message);
    }
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
