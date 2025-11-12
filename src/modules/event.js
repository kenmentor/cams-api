const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    maxguest: { type: Number, default: 1 },

    location: { type: String, required: true },

    views: {
      default: 0,
      type: Number,
    },
    requestCount: {
      type: Number,
    },
    category: { type: String, required: true },
    thumbnail: String,

    avaliable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Add indexes for fast queries
resourceSchema.index({ location: "text", type: "text", category: "text" }); // Full-text search
module.exports = mongoose.model("testEvent", resourceSchema);
