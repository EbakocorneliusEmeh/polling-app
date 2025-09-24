import pool from "../config/db.js";

// Generate random 6-character session code
function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const createSessionDB = async (hostId, title) => {
  const code = generateSessionCode();
  const result = await pool.query(
    "INSERT INTO sessions (host_id, title, code) VALUES ($1, $2, $3) RETURNING *",
    [hostId, title, code]
  );
  return result.rows[0];
};

export const findSessionByCode = async (code) => {
  const result = await pool.query(
    "SELECT * FROM sessions WHERE code = $1",
    [code]
  );
  return result.rows[0];
};
