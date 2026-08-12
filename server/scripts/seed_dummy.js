const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const CITIES = ['Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Delhi', 'Goa'];
const PROP_TYPES = ['Villa', 'Apartment', 'Plot', 'Commercial'];
const STATUSES = ['Sale', 'Rent'];
const AMENITIES = ['Swimming Pool', '24/7 Security', 'Power Backup', 'Gymnasium', 'Covered Parking', 'Modular Kitchen', 'Club House', 'Private Garden'];

const TITLES = [
  'SVS Emerald Heights', 'SVS Whispering Palms', 'SVS Sapphire Residency', 'SVS Silver Oaks',
  'SVS Golden Horizon', 'SVS Azure Waterfront', 'SVS Grand Central Penthouse', 'SVS Green Acres Plot',
  'SVS Tech Park Hub', 'SVS Cozy Wood Villa', 'SVS Serenity Towers', 'SVS Heritage Boulevard',
  'SVS Signature Suite', 'SVS Sky View Residence', 'SVS Meadows Township'
];

const DESCRIPTIONS = [
  'A beautiful property located in a pristine, peaceful environment with excellent connectivity and premium fittings.',
  'Stunning modern design with ample natural light, spacious layout, and luxury finishes throughout.',
  'An excellent investment opportunity in a rapidly growing area with world-class facilities and security.',
  'Perfect for families seeking comfort, luxury, and style. Features state-of-the-art automation and security.',
  'Strategically located commercial space designed to boost business productivity with prime highway access.'
];

const NAMES = ['Rajesh Kumar', 'Karan Johar', 'Neha Sharma', 'Aditya Roy', 'Pooja Hegde', 'Siddharth Malhotra', 'Anjali Gupta'];
const EMAILS = ['rajesh@example.com', 'karan@example.com', 'neha@example.com', 'aditya@example.com', 'pooja@example.com', 'sid@example.com', 'anjali@example.com'];
const MESSAGES = [
  'Can you please send me the pricing details and floor plan?',
  'I would like to schedule a virtual tour/video call to view this property.',
  'Is this property registered under RERA? Please share registration number.',
  'What are the monthly maintenance charges and security deposit requirements?',
  'I am highly interested in purchasing this. Please connect me with the sales agent.'
];

const generateDummyProperties = (count) => {
  const properties = [];
  for (let i = 0; i < count; i++) {
    const title = TITLES[i % TITLES.length] + ` (Unit ${Math.floor(Math.random() * 100) + 1})`;
    const propertyType = PROP_TYPES[Math.floor(Math.random() * PROP_TYPES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const price = status === 'Sale' 
      ? Math.floor(Math.random() * 90000000) + 5000000 // 50L to 9.5Cr
      : Math.floor(Math.random() * 250000) + 15000;   // 15k to 2.65L
    
    const numAmenities = Math.floor(Math.random() * 4) + 3; // 3 to 6 amenities
    const selectedAmenities = [...AMENITIES].sort(() => 0.5 - Math.random()).slice(0, numAmenities);

    const typeImages = {
      Villa: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
      ],
      Apartment: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
      ],
      Plot: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
      ],
      Commercial: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
      ]
    };

    const images = typeImages[propertyType] || typeImages.Apartment;

    properties.push({
      title,
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      propertyType,
      status,
      price,
      location: `${city} Suburbs`,
      address: `${Math.floor(Math.random() * 500) + 1}, VIP Lane, ${city}`,
      city,
      state: city === 'Mumbai' ? 'Maharashtra' : city === 'Bangalore' ? 'Karnataka' : 'Telangana',
      pincode: String(Math.floor(Math.random() * 900000) + 100000),
      bedrooms: propertyType === 'Plot' || propertyType === 'Commercial' ? 0 : Math.floor(Math.random() * 4) + 1,
      bathrooms: propertyType === 'Plot' ? 0 : Math.floor(Math.random() * 3) + 1,
      areaSqft: Math.floor(Math.random() * 4000) + 800,
      amenities: selectedAmenities,
      images: images.sort(() => 0.5 - Math.random()).slice(0, 2),
      featured: Math.random() > 0.6,
      active: true
    });
  }
  return properties;
};

const seedDummyData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://vignesh1515official_db_user:8tOwri1ix8PSzL3K@projects.xqbabtx.mongodb.net/svs_real_estate';
    
    try {
      console.log(`Connecting to database to seed dummy data: ${mongoUri}`);
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

    console.log('Connected to MongoDB.');

    // Generate and seed 15 properties
    const dummyProps = generateDummyProperties(15);
    const savedProperties = [];
    for (const propData of dummyProps) {
      const prop = new Property(propData);
      await prop.save();
      savedProperties.push(prop);
    }
    console.log(`Successfully generated and seeded ${savedProperties.length} dummy properties.`);

    // Generate and seed 5 inquiries linked to saved properties
    const inquiries = [];
    for (let i = 0; i < 5; i++) {
      const randomProp = savedProperties[Math.floor(Math.random() * savedProperties.length)];
      const nameIndex = Math.floor(Math.random() * NAMES.length);
      inquiries.push({
        name: NAMES[nameIndex],
        email: EMAILS[nameIndex],
        phone: `+91 9${Math.floor(Math.random() * 900000000) + 100000000}`,
        message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        propertyId: randomProp._id,
        status: ['New', 'Contacted', 'Closed'][Math.floor(Math.random() * 3)]
      });
    }

    const savedInquiries = await Inquiry.create(inquiries);
    console.log(`Successfully generated and seeded ${savedInquiries.length} dummy inquiries.`);

    console.log('Dummy data seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    process.exit(1);
  }
};

seedDummyData();
