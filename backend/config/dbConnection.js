const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_US}:${process.env.DB_PS}@${process.env.DB_CLUSTER}.mongodb.net/sharpresumeai?retryWrites=true&w=majority` 

// console.log("process.env.MONGODB_CLUSTER_URL", process.env.MONGODB_CLUSTER_URL);

// const MONGODB_URI = 'mongodb://localhost:27017/sharpresumeai'

if (!MONGODB_URI) {
  console.error(
    "❌ MongoDB URI is missing. Set DB_URI in environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

module.exports = mongoose;
