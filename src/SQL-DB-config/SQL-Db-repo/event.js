const EventModel = require("../../database/event");
const sql = require("../../sql/sqlQuery");
const Event = require("../../models/Event");

class EventRepository {
  async findAll() {
    sql.query("SELECT * FROM events");

    const rows = await EventModel.find().lean();
    return rows.map((r) => new Event(r));
  }

  async findById(id) {
    sql.query("SELECT * FROM events WHERE id = ?", [id]);

    const row = await EventModel.findById(id).lean();
    return row ? new Event(row) : null;
  }

  async findByHost(hostId) {
    sql.query("SELECT * FROM events WHERE host = ?", [hostId]);

    const rows = await EventModel.find({ host: hostId }).lean();
    return rows.map((r) => new Event(r));
  }

  async create(data) {
    sql.query(
      "INSERT INTO events (host, title, description, maxguest, location, views, requestCount, category, thumbnail, avaliable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.host,
        data.title,
        data.description,
        data.maxguest || 1,
        data.location,
        data.views || 0,
        data.requestCount || 0,
        data.category,
        data.thumbnail || null,
        data.avaliable ?? true,
      ]
    );

    const created = await EventModel.create(data);
    return new Event(created.toObject());
  }

  async update(id, data) {
    sql.query("UPDATE events SET ... WHERE id = ?", [id]);

    const updated = await EventModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    return updated ? new Event(updated) : null;
  }

  async delete(id) {
    sql.query("DELETE FROM events WHERE id = ?", [id]);
    return EventModel.findByIdAndDelete(id);
  }

  async incrementViews(id) {
    sql.query("UPDATE events SET views = views + 1 WHERE id = ?", [id]);

    const updated = await EventModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    return updated ? new Event(updated) : null;
  }

  async getAnalytics() {
    sql.query(`
      SELECT 
        COUNT(*) AS totalEvents,
        SUM(views) AS totalViews,
        SUM(requestCount) AS totalRequests
      FROM events
    `);

    const rows = await EventModel.aggregate([
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          totalViews: { $sum: "$views" },
          totalRequests: { $sum: "$requestCount" },
        },
      },
    ]);

    return (
      rows[0] || {
        totalEvents: 0,
        totalViews: 0,
        totalRequests: 0,
      }
    );
  }
}

module.exports = new EventRepository();
