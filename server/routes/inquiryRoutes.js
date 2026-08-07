const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/auth');

// Public inquiry creation
router.post('/', createInquiry);

// Protected admin routes
router.get('/', protect, getInquiries);
router.patch('/:id', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
