const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyFeatured,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getProperties);
router.get('/:slug', getPropertyBySlug);

// Admin-only routes
router.post('/', protect, upload.array('images', 10), createProperty);
router.put('/:id', protect, upload.array('images', 10), updateProperty);
router.delete('/:id', protect, deleteProperty);
router.patch('/:id/featured', protect, togglePropertyFeatured);

module.exports = router;
