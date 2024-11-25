const db = require("../config/db");

const ContactModel = {
  async create(name, email, message) {
    const query =
      "INSERT INTO contactmessages(username, email, message) VALUES($1, $2, $3) RETURNING *";
    const values = [name, email, message];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

module.exports = ContactModel;
