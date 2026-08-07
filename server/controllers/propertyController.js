const Property = require('../models/Property');
const { uploadImage, deleteImage } = require('../services/uploadService');

/**
 * @desc    Get all properties (with filtering, sorting, pagination)
 * @route   GET /api/properties
 * @access  Public
 */
const getProperties = async (req, res) => {
  try {
    const {
      search,
      location,
      propertyType,
      status,
      minPrice,
      maxPrice,
      bedrooms,
      featured,
      active,
      sort,
      page = 1,
      limit = 9,
    } = req.query;

    const query = {};

    // Filter by active status (default: true for visitors, unless requested otherwise)
    if (active === 'false') {
      query.active = false;
    } else if (active === 'all') {
      // Do not filter by active
    } else {
      query.active = true;
    }

    // Search query (title, description, location, city)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    // Exact Filters
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (propertyType) {
      query.propertyType = propertyType;
    }
    if (status) {
      query.status = status;
    }
    if (bedrooms) {
      // Handle "4+" bedrooms or similar cases
      if (bedrooms === '4+') {
        query.bedrooms = { $gte: 4 };
      } else {
        query.bedrooms = parseInt(bedrooms);
      }
    }
    if (featured === 'true') {
      query.featured = true;
    }

    // Price Range Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sorting
    let sortQuery = { createdAt: -1 }; // default newest
    if (sort === 'price_asc') {
      sortQuery = { price: 1 };
    } else if (sort === 'price_desc') {
      sortQuery = { price: -1 };
    } else if (sort === 'newest') {
      sortQuery = { createdAt: -1 };
    }

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      properties,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ success: false, message: 'Server error fetching properties' });
  }
};

/**
 * @desc    Get single property by slug
 * @route   GET /api/properties/:slug
 * @access  Public
 */
const getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({ success: true, property });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ success: false, message: 'Server error fetching property details' });
  }
};

/**
 * @desc    Create a new property
 * @route   POST /api/properties
 * @access  Private (Admin)
 */
const createProperty = async (req, res) => {
  try {
    const propertyData = { ...req.body };

    // Format array fields from form data string (since application/form-data sends them as strings)
    if (typeof propertyData.amenities === 'string') {
      try {
        propertyData.amenities = JSON.parse(propertyData.amenities);
      } catch (e) {
        propertyData.amenities = propertyData.amenities.split(',').map(item => item.trim()).filter(Boolean);
      }
    }

    // Upload images
    const images = [];
    if (req.files && req.files.length > 0) {
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      for (const file of req.files) {
        const url = await uploadImage(file, hostUrl);
        if (url) images.push(url);
      }
    }
    propertyData.images = images;

    // Convert booleans
    propertyData.featured = propertyData.featured === 'true' || propertyData.featured === true;
    propertyData.active = propertyData.active === 'true' || propertyData.active === true || propertyData.active === undefined;
    propertyData.price = Number(propertyData.price);
    propertyData.bedrooms = Number(propertyData.bedrooms || 0);
    propertyData.bathrooms = Number(propertyData.bathrooms || 0);
    propertyData.areaSqft = Number(propertyData.areaSqft);

    const property = new Property(propertyData);
    await property.save();

    res.status(201).json({ success: true, property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(400).json({ success: false, message: error.message || 'Error creating property' });
  }
};

/**
 * @desc    Update an existing property
 * @route   PUT /api/properties/:id
 * @access  Private (Admin)
 */
const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const propertyData = { ...req.body };

    // Parse array fields
    if (typeof propertyData.amenities === 'string') {
      try {
        propertyData.amenities = JSON.parse(propertyData.amenities);
      } catch (e) {
        propertyData.amenities = propertyData.amenities.split(',').map(item => item.trim()).filter(Boolean);
      }
    }

    // Manage existing images sent back as string/array from frontend
    let existingImages = [];
    if (propertyData.images) {
      if (typeof propertyData.images === 'string') {
        try {
          existingImages = JSON.parse(propertyData.images);
        } catch (e) {
          existingImages = [propertyData.images];
        }
      } else if (Array.isArray(propertyData.images)) {
        existingImages = propertyData.images;
      }
    } else {
      // If not sent, keep existing
      existingImages = property.images;
    }

    // Determine deleted images and clean them up
    const deletedImages = property.images.filter(img => !existingImages.includes(img));
    for (const imgUrl of deletedImages) {
      await deleteImage(imgUrl);
    }

    // Handle new uploads
    const newImages = [];
    if (req.files && req.files.length > 0) {
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      for (const file of req.files) {
        const url = await uploadImage(file, hostUrl);
        if (url) newImages.push(url);
      }
    }

    // Combine existing remaining images with newly uploaded images
    propertyData.images = [...existingImages, ...newImages];

    // Data conversions
    if (propertyData.featured !== undefined) {
      propertyData.featured = propertyData.featured === 'true' || propertyData.featured === true;
    }
    if (propertyData.active !== undefined) {
      propertyData.active = propertyData.active === 'true' || propertyData.active === true;
    }
    if (propertyData.price !== undefined) propertyData.price = Number(propertyData.price);
    if (propertyData.bedrooms !== undefined) propertyData.bedrooms = Number(propertyData.bedrooms);
    if (propertyData.bathrooms !== undefined) propertyData.bathrooms = Number(propertyData.bathrooms);
    if (propertyData.areaSqft !== undefined) propertyData.areaSqft = Number(propertyData.areaSqft);

    // Save update
    property = await Property.findByIdAndUpdate(req.params.id, propertyData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, property });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ success: false, message: error.message || 'Error updating property' });
  }
};

/**
 * @desc    Delete a property
 * @route   DELETE /api/properties/:id
 * @access  Private (Admin)
 */
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Delete associated images
    for (const imgUrl of property.images) {
      await deleteImage(imgUrl);
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, message: 'Server error deleting property' });
  }
};

/**
 * @desc    Toggle property featured status
 * @route   PATCH /api/properties/:id/featured
 * @access  Private (Admin)
 */
const togglePropertyFeatured = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.featured = !property.featured;
    await property.save();

    res.json({ success: true, featured: property.featured, property });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ success: false, message: 'Server error toggling featured status' });
  }
};

module.exports = {
  getProperties,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyFeatured,
};
