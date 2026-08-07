const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');

/**
 * @desc    Create a new inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
const createInquiry = async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body;

  try {
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, phone, message)' });
    }

    if (propertyId) {
      // Verify property exists
      const propertyExists = await Property.findById(propertyId);
      if (!propertyExists) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      propertyId: propertyId || null,
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. An agent will contact you soon.',
      inquiry,
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error processing inquiry' });
  }
};

/**
 * @desc    Get all inquiries
 * @route   GET /api/inquiries
 * @access  Private (Admin)
 */
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('propertyId', 'title slug price location')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
};

/**
 * @desc    Update inquiry status
 * @route   PATCH /api/inquiries/:id
 * @access  Private (Admin)
 */
const updateInquiryStatus = async (req, res) => {
  const { status } = req.body;

  try {
    if (!status || !['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid status: New, Contacted, or Closed' });
    }

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    inquiry.status = status;
    await inquiry.save();

    // Populate property before sending back
    await inquiry.populate('propertyId', 'title slug price location');

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      inquiry,
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error updating inquiry status' });
  }
};

/**
 * @desc    Delete an inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Private (Admin)
 */
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry' });
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
};
