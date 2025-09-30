


// src/models/participantModel.js
import pool from "../config/db.js";

/**
 * Add a participant to a session
 * @param {string} sessionCode
 * @param {{name: string, email: string}} participant
 * @returns {Promise<Object>} inserted participant
 */
export const addParticipantToSession = async (sessionCode, participant) => {
  const { name, email } = participant;

  try {
    const result = await pool.query(
      "INSERT INTO participants (session_code, name, email) VALUES ($1, $2, $3) RETURNING *",
      [sessionCode, name, email]
    );

    return result.rows[0]; // returns the inserted participant
  } catch (err) {
    console.error("❌ addParticipantToSession Error:", err);
    throw err;
  }
};

/**
 * Get all participants for a session
 * @param {string} sessionCode
 * @returns {Promise<Array>} array of participants
 */
export const getParticipantsBySession = async (sessionCode) => {
  try {
    const result = await pool.query(
      "SELECT * FROM participants WHERE session_code = $1",
      [sessionCode]
    );
    return result.rows;
  } catch (err) {
    console.error("❌ getParticipantsBySession Error:", err);
    throw err;
  }
};

/**
 * Find a participant by session code and email
 * @param {string} sessionCode
 * @param {string} email
 * @returns {Promise<Object|null>} participant or null
 */
export const findParticipantBySessionCodeAndEmail = async (sessionCode, email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM participants WHERE session_code = $1 AND email = $2",
      [sessionCode, email]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error("❌ findParticipantBySessionCodeAndEmail Error:", err);
    throw err;
  }
};
