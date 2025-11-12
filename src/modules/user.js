// Import mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },

    regNumber: {
      type: Number,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    verifiedEmail: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "USER",
    },
    rank: {
      type: Number,
      default: 1,
    },

    profileImage: {
      type: String,
    },

    forgottonPasswordToken: String,
    forgottonPasswordTokenExpireAt: Date,
    verifyToken: String,
    verificationTokenExpireAt: Date,
  },
  { timestamps: true }
);

// Create a model

module.exports = mongoose.model("testUser", userSchema);
