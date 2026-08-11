const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGO_URI || 'mongodb+srv://vignesh1515official_db_user:O09eVlE2W596OhAo@projects.xqbabtx.mongodb.net/?appName=projects';
  if (uri.includes('<O09eVlE2W596OhAo>')) {
    console.log('Detected placeholder password in MONGO_URI. Falling back to local MongoDB.');
    uri = 'mongodb://127.0.0.1:27017/svs_real_estate';
  }
  try {
    //const conn = await mongoose.connect(uri);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB (${uri}): ${error.message}`);
    const fallbackUri = 'mongodb://127.0.0.1:27017/svs_real_estate';
    if (uri !== fallbackUri) {
      console.log(`Attempting connection to local MongoDB fallback (${fallbackUri})...`);
      try {
        const conn = await mongoose.connect(fallbackUri);
        console.log(`MongoDB Connected to fallback: ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`Local MongoDB fallback failed: ${fallbackError.message}`);
      }
    }
    process.exit(1);
  }
};

module.exports = connectDB;
