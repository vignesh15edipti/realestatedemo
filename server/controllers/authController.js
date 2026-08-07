const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkeyforlocaldevelopment123456', {
    expiresIn: '30d',
  });
};

/**
 * @desc    Auth admin & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(admin._id),
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

/**
 * @desc    Get admin profile
 * @route   GET /api/auth/profile
 * @access  Private (Admin)
 */
const getAdminProfile = async (req, res) => {
  try {
    // req.admin is set by protect middleware
    res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
};
