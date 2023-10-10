// db.js
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.urls;

const connectDB = async () => {
  try {
    // Replace 'your_database_url' with your actual MongoDB connection string
    const dbUrl =url;

    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('Hey Shafik,Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
  
  module.exports = connectDB;

  
  
  
