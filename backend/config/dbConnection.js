const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  const { MONGO_DB_URI } = process.env;

  if (!MONGO_DB_URI) {
    console.error("❌ Missing MONGO_DB_URI in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_DB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      family: 4,
    });

    console.log("✅ MongoDB connected");

    // Optional: Add lifecycle monitoring
    mongoose.connection.on('disconnected', () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed gracefully");
      process.exit(0);
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
