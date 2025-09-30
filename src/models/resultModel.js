import pool from "../config/db.js";

export const getAllSubmissionsDB = async (sessionCode) => {
  const query = `
    SELECT r.id AS response_id, r.poll_id, r.option_id, r.text, p.name, p.email
    FROM responses r
    JOIN participants p ON r.participant_id = p.id
    JOIN sessions s ON p.session_code = s.code
    WHERE s.code = $1
    ORDER BY r.created_at ASC
  `;
  const { rows } = await pool.query(query, [sessionCode]);
  return rows;
};

export const markSessionCompletedDB = async (sessionCode) => {
  await pool.query(`UPDATE sessions SET status = 'completed' WHERE code = $1`, [sessionCode]);
};
