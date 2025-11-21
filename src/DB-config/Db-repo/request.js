const RequestModel = require("../../database/request");
const sql = require("../../sql/sqlQuery");
const Request = require("../../models/Request");

class RequestRepository {
  async findAllByUser(userId) {
    sql.query("SELECT * FROM requests WHERE host = ? OR guest = ?", [
      userId,
      userId,
    ]);

    const rows = await RequestModel.find({
      $or: [{ host: userId }, { guest: userId }],
    })
      .populate("host guest house")
      .lean();

    return rows.map((r) => new Request(r));
  }

  async findById(id) {
    sql.query("SELECT * FROM requests WHERE id = ?", [id]);

    const row = await RequestModel.findById(id)
      .populate("host guest house")
      .lean();

    return row ? new Request(row) : null;
  }

  async update(id, data) {
    sql.query("UPDATE requests SET ... WHERE id = ?", [id]);

    const updated = await RequestModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    return updated ? new Request(updated) : null;
  }

  async delete(id) {
    sql.query("DELETE FROM requests WHERE id = ?", [id]);

    return RequestModel.findByIdAndDelete(id);
  }
}

module.exports = new RequestRepository();
