const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('../models/Admin');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleAdmin = {
  name: 'SVS Real Estate Admin',
  email: 'admin@svs.com',
  password: 'AdminPassword123', // Will be hashed by pre-save hook
  role: 'admin',
};

const sampleProperties = [
  {
    title: 'SVS Royal Palms Villa',
    description: 'A luxurious 4 BHK villa with a private pool, lush green gardens, and state-of-the-art home automation. Located in the premium gated community of Jubilee Hills, this villa offers unparalleled privacy and world-class amenities.',
    propertyType: 'Villa',
    status: 'Sale',
    price: 85000000, // 8.5 Cr
    location: 'Jubilee Hills',
    address: 'Road No. 12, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 4800,
    amenities: ['Private Pool', 'Home Automation', 'Gated Community', 'Modular Kitchen', 'Servant Quarters', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    active: true,
  },
  {
    title: 'Premium Sky Residence Penthouse',
    description: 'Modern 3 BHK penthouse offering a breathtaking view of the sea. Outfitted with premium imported marble flooring, custom walk-in wardrobes, and an expansive balcony setup.',
    propertyType: 'Apartment',
    status: 'Sale',
    price: 42000000, // 4.2 Cr
    location: 'Worli Sea Face',
    address: 'Worli Sea Face, Near Bandra-Worli Sea Link',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400030',
    bedrooms: 3,
    bathrooms: 4,
    areaSqft: 2600,
    amenities: ['Sea View', 'Gymnasium', 'Concierge Service', 'Infinity Pool', 'Covered Parking', 'High Speed Elevators'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    active: true,
  },
  {
    title: 'Commercial HQ Business Park Hub',
    description: 'Ready-to-move-in fully furnished commercial office space suitable for IT companies, consulting firms, or corporate offices. Configured with 80 workstations, 4 manager cabins, and 2 conference rooms.',
    propertyType: 'Commercial',
    status: 'Rent',
    price: 350000, // 3.5 L / month
    location: 'Whitefield',
    address: 'Whitefield Main Road, Near ITPL',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    bedrooms: 0,
    bathrooms: 4,
    areaSqft: 5500,
    amenities: ['Central Air Conditioning', 'Power Backup', 'Cafeteria', 'Conference Rooms', 'Server Room', 'Reserved Parking'],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    active: true,
  },
  {
    title: 'SVS Serene Valley Plots',
    description: 'Exclusive villa plots in a clean, rapidly developing corridor of Devanahalli. Excellent opportunity for investment or building your dream custom vacation home with direct highway access.',
    propertyType: 'Plot',
    status: 'Sale',
    price: 8500000, // 85 Lakhs
    location: 'Devanahalli',
    address: 'NH 44, Near Kempegowda International Airport',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '562110',
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 2400,
    amenities: ['Wide Asphalt Roads', 'Underground Utilities', 'Street Lights', 'Overhead Water Tank', 'Childrens Park'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    active: true,
  },
  {
    title: 'High-Rise Luxury Apartment',
    description: 'Chic 2 BHK apartment in a high-rise condominium complex. Features smart lighting, contemporary fittings, and excellent ventilation. Perfect for families working in Cybercity.',
    propertyType: 'Apartment',
    status: 'Rent',
    price: 48000, // 48k / month
    location: 'Gachibowli',
    address: 'Outer Ring Road, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1350,
    amenities: ['Clubhouse', 'Childrens Play Area', 'Lawn Tennis Court', 'Power Backup', 'Intercom', 'Supermarket Setup'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    active: true,
  },
  {
    title: 'Heritage Villa in Goa',
    description: 'Renovated Portuguese-style 3 BHK villa with modern finishes. Nestled in a quiet village location just 10 minutes away from Vagator Beach. Features a stunning tiled patio and high wooden ceilings.',
    propertyType: 'Villa',
    status: 'Sale',
    price: 32000000, // 3.2 Cr
    location: 'Anjuna',
    address: 'Anjuna Mapusa Road',
    city: 'Goa',
    state: 'Goa',
    pincode: '403509',
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2800,
    amenities: ['Private Garden', 'Furnished', 'Tiled Patio', 'Well Water', 'Air Conditioned', 'Verandah'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    active: true,
  },
  {
    title: 'Premium Retail Space Mall Arcade',
    description: 'High-visibility corner retail showroom space on the ground floor of a bustling commercial complex. Ideal for lifestyle brands, boutiques, jewelry showrooms, or high-end cafes.',
    propertyType: 'Commercial',
    status: 'Sale',
    price: 18000000, // 1.8 Cr
    location: 'Saket',
    address: 'Saket District Centre',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110017',
    bedrooms: 0,
    bathrooms: 1,
    areaSqft: 950,
    amenities: ['Central Air Conditioning', 'Glass Frontage', '24/7 Access', 'Visitor Parking', 'Fire Fighting System'],
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    active: true,
  },
  {
    title: 'The SVS Retreat Green Villa',
    description: 'Spacious 5 BHK luxury country home surrounded by organic gardens and orchards. Designed with local sandstone cladding, double-glazed windows, and sustainable rainwater harvesting systems.',
    propertyType: 'Villa',
    status: 'Rent',
    price: 120000, // 1.2 L / month
    location: 'Sohna Road',
    address: 'Sohna-Gurgaon Road',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122103',
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 5200,
    amenities: ['Organic Farming Area', 'Solar Power', 'Rainwater Harvesting', 'Private Terrace', 'Gym', 'Pet Friendly'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    active: true,
  },
];

const seedDB = async () => {
  let mongoUri = process.env.MONGO_URI || 'mongodb+srv://vignesh1515official_db_user:8tOwri1ix8PSzL3K@projects.xqbabtx.mongodb.net/?appName=projects';
  try {
    console.log(`Connecting to database for seeding: ${mongoUri}`);
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error(`Primary connection failed: ${err.message}`);
    const fallbackUri = 'mongodb://127.0.0.1:27017/svs_real_estate';
    if (mongoUri !== fallbackUri) {
      console.log(`Attempting connection to local MongoDB fallback for seeding: ${fallbackUri}`);
      await mongoose.connect(fallbackUri);
    } else {
      throw err;
    }
  }

  try {

    // Clear existing data
    await Admin.deleteMany({});
    await Property.deleteMany({});
    await Inquiry.deleteMany({});
    console.log('Cleared existing Admin, Property, and Inquiry records.');

    // Seed Admin
    const admin = new Admin(sampleAdmin);
    await admin.save();
    console.log('Admin user seeded successfully!');
    console.log(`Email: ${sampleAdmin.email}`);
    console.log(`Password: ${sampleAdmin.password}`);

    // Seed Properties individually to trigger pre-save slug hooks
    const insertedProperties = [];
    for (const propData of sampleProperties) {
      const prop = new Property(propData);
      await prop.save();
      insertedProperties.push(prop);
    }
    console.log(`Seeded ${insertedProperties.length} properties!`);

    // Seed multiple dummy inquiries of various types and statuses
    if (insertedProperties.length > 0) {
      const inquiriesToSeed = [
        {
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          phone: '+91 9876543210',
          message: 'Hello, I am interested in SVS Royal Palms Villa. Could you please schedule a virtual walkthrough or share brochure details? Thanks.',
          propertyId: insertedProperties[0]._id,
          status: 'New',
        },
        {
          name: 'Priya Patel',
          email: 'priya.patel@example.com',
          phone: '+91 9988776655',
          message: 'Is the price of the Worli Sea Face Penthouse negotiable? I would like to schedule a physical visit this Saturday afternoon.',
          propertyId: insertedProperties[1]._id,
          status: 'New',
        },
        {
          name: 'Amit Verma',
          email: 'amit.verma@example.com',
          phone: '+91 9123456789',
          message: 'Looking for commercial office space in Whitefield for our IT firm startup. What is the minimum lease duration?',
          propertyId: insertedProperties[2]._id,
          status: 'Contacted',
        },
        {
          name: 'Sneha Reddy',
          email: 'sneha.reddy@example.com',
          phone: '+91 8877665544',
          message: 'I am interested in buying one of the Serene Valley Plots in Devanahalli. Can you send the layout plan and approval documents?',
          propertyId: insertedProperties[3]._id,
          status: 'Closed',
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 9000000001',
          message: 'Hi, I need assistance in finding a luxury 3 BHK villa in Goa. Do you have options other than Anjuna? Please contact me as soon as possible.',
          status: 'New',
        },
        {
          name: 'Vikram Singh',
          email: 'vikram.singh@example.com',
          phone: '+91 9555544433',
          message: 'I would like to know if SVS Retreat Green Villa is pet friendly and has power backup facility.',
          propertyId: insertedProperties[7]._id,
          status: 'Contacted',
        }
      ];

      await Inquiry.create(inquiriesToSeed);
      console.log(`Seeded ${inquiriesToSeed.length} sample inquiries successfully!`);
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
