const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testUser",
      require: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testUser",
      required: true,
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testUser",
      required: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add indexes for fast queries
requestSchema.index({ location: "text", type: "text", category: "text" }); // Full-text search
module.exports = mongoose.model("testRequest", requestSchema);
