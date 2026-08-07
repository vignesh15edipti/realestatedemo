const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    propertyType: {
      type: String,
      required: [true, 'Please select a property type'],
      enum: {
        values: ['Apartment', 'Villa', 'Plot', 'Commercial'],
        message: 'Property type must be Apartment, Villa, Plot, or Commercial',
      },
    },
    status: {
      type: String,
      required: [true, 'Please select a status'],
      enum: {
        values: ['Sale', 'Rent'],
        message: 'Status must be Sale or Rent',
      },
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location/locality'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, 'Please add a pincode'],
      trim: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    areaSqft: {
      type: Number,
      required: [true, 'Please add the area in square feet'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Slugify title helper function
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

// Auto generate slug before save
propertySchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    return next();
  }
  
  let tempSlug = slugify(this.title);
  
  // Ensure unique slug
  const Property = mongoose.model('Property', propertySchema);
  let count = 0;
  let uniqueSlug = tempSlug;
  
  while (true) {
    const existing = await Property.findOne({ slug: uniqueSlug });
    if (!existing || existing._id.equals(this._id)) {
      break;
    }
    count++;
    uniqueSlug = `${tempSlug}-${count}`;
  }
  
  this.slug = uniqueSlug;
  next();
});

module.exports = mongoose.model('Property', propertySchema);
