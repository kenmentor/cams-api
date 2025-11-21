const UserModel = require("../../database/user");
const sql = require("../../sql/sqlQuery");
const User = require("../../models/User");

class UserRepository {
  async findAll() {
    sql.query("SELECT * FROM users");

    const rows = await UserModel.find().lean();
    return rows.map((r) => new User(r));
  }

  async findById(id) {
    sql.query("SELECT * FROM users WHERE id = ?", [id]);

    const row = await UserModel.findById(id).lean();
    return row ? new User(row) : null;
  }

  async promote(id, role) {
    sql.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);

    const updated = await UserModel.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).lean();

    return updated ? new User(updated) : null;
  }

  async delete(id) {
    sql.query("DELETE FROM users WHERE id = ?", [id]);

    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
