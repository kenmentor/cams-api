const crudRepositoryExtra = require("./CRUD");
const mongoose = require("mongoose");
class house_repo extends crudRepositoryExtra {
  constructor(module) {
    super(module);
  }
  async getDetail(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid resource ID format");
    }

    try {
      const data = await this.module
        .findById(id)
        .populate("host", "phoneNumber _id"); // populate only phoneNumber, exclude _id

      if (!data) {
        throw new Error("Resource not found");
      }

      return data;
    } catch (error) {
      console.error("Error fetching resource:", error.message);
      throw new Error(error.message || "Failed to fetch resource");
    }
  }
  async create(object) {
    const count = await this.module.countDocuments();
    try {
      const newmodule = new this.module({ ...object });

      const data = await newmodule.save();
      return data;
    } catch (err) {
      console.log("error while creating data -crud");
      throw err;
    }
  }
  async filter(filter) {
    try {
      let query = {};

      // 🔎 Step 1: Text-based filters
      const textFilters = ["location", "type", "category"];
      let searchTerms = [];

      textFilters.forEach((field) => {
        if (filter[field] && filter[field] !== "undefined") {
          searchTerms.push(filter[field]);
        }
      });

      if (searchTerms.length > 0) {
        // Try text index first
        query.$text = { $search: searchTerms.join(" ") };
      }

      // ❌ Exclude house ID if provided
      if (filter.id && filter.id !== "undefined") {
        query._id = { $ne: mongoose.Types.ObjectId(filter.id) };
      }

      // 💰 Price filter with adaptive tolerance

      const limit = Number(filter.limit) || 50;
      const page = Number(filter.bardge) || 1;
      const skip = (page - 1) * limit;

      // ⚖️ Sorting
      const sort = query.$text
        ? { score: { $meta: "textScore" }, createdAt: -1 }
        : { createdAt: -1 };

      const projection = query.$text ? { score: { $meta: "textScore" } } : {};

      // 🚀 Primary Query
      let results = await this.module
        .find(query, projection)
        .limit(limit)
        .skip(skip)
        .sort(sort);
      if (results.length !== 0) {
        return results;
      }

      // 🟡 Step 2: Expand price tolerance if no results

      // 🔵 Step 3: Loose regex fallback if still nothing
      if (results.length === 0 && searchTerms.length > 0) {
        const looseQuery = {
          $or: textFilters.map((field) => ({
            [field]: { $regex: new RegExp(searchTerms.join("|"), "i") },
          })),
        };

        results = await this.module
          .find(looseQuery)
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        if (results.length !== 0) {
          return results;
        }
      }

      console.log("✅ Final Results:", results.length);
      return results;
    } catch (error) {
      console.error("❌ Error filtering data:", error);
      throw error;
    }
  }

  async losefilter(filter) {
    function queryBuilder(filter) {
      let query = {
        $or: [],
      };
    }
    this.module
      .find(queryBuilder(filter))
      .limit(filter.limit)
      .skip(filter.limit * filter.bardge - 1)
      .exec((err, event) => {
        return event;
      });
  }
}
module.exports = house_repo;
