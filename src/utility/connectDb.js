const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ SQL URI is missing! Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ SQL Connected Successfully!");
  } catch (error) {
    console.error("❌ SQL Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
