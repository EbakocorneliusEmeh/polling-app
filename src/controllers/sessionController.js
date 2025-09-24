// src/controllers/sessionController.js
import pool from "../config/db.js";
import { nanoid } from "nanoid";

// Create a new session
export const createSession = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Session title is required" });
    }

    const hostId = req.user.id; // from JWT middleware

    // Generate a unique 8-character session code
    const code = nanoid(8).toUpperCase();

    // Insert session into the database
    const query = `
      INSERT INTO sessions (host_id, title, code)
      VALUES ($1, $2, $3)
      RETURNING id, host_id AS "hostId", title, code, status, created_at
    `;

    const { rows } = await pool.query(query, [hostId, title, code]);
    const session = rows[0];

    res.status(201).json({
      message: "Session created",
      session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions for the logged-in host
export const getSessions = async (req, res) => {
  try {
    const hostId = req.user.id; // from JWT middleware

    const query = `
      SELECT id, title, code, status, created_at
      FROM sessions
      WHERE host_id = $1
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query, [hostId]);

    res.status(200).json({
      sessions: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
