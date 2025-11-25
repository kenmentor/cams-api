const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const uri = process.env.DATABASE_URL;

  if (!uri) {
    console.error("❌ Database URL missing. Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connection established.");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);

    // If local network issue, log friendly message
    console.error(
      "⚠️ Check your internet connection, firewall, or Atlas IP whitelist."
    );

    process.exit(1);
  }
};

module.exports = connectDB;
