const { Client } = require("pg");
const DB_NAME = "barhopper";
const DB_URL =
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

async function create_user(report_fields) {
  const { username, password } = report_fields;
  try {
    const {
      rows: [users],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        RETURNING *
        `,
      [username, password]
    );
    console.log(users);
    return users;
  } catch (error) {
    console.log("Error creating user.");
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT username FROM users;
      `);
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create_user,
  client,
  getAllUsers,
};
