const crud = require("./CRUD");
class booking_repe extends crud {
  constructor(module) {
    super(module);
  }
  async find(object) {
    try {
      const data = await this.module
        .find(object)
        .populate("event", "thumbnail title _id")
        .populate("guest", " userName _id")
        .populate("host", " userName _id");
      console.log(data, "data in booking repo");
      return data;
    } catch (error) {
      console.error("Error fetching data from DB:", error);
    }
  }
}

module.exports = booking_repe;
