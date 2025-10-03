// src/controllers/resultsController.js
import pool from "../config/db.js";
import { io } from "../../index.js"; // ✅ make sure index.js actually exports io

// Fetch all submissions for a session (host only)
export const getSubmissions = async (req, res) => {
  try {
    const { sessionCode } = req.params;
    console.log("🎯 getSubmissions called for sessionCode:", sessionCode);

    // Get session ID from session code
    const sessionResult = await pool.query(
      "SELECT id FROM sessions WHERE code = $1",
      [sessionCode]
    );
    console.log("🔍 Session lookup result:", sessionResult.rows);

    if (!sessionResult.rows.length) {
      console.warn("⚠️ Session not found:", sessionCode);
      return res.status(404).json({ message: "Session not found" });
    }

    const sessionId = sessionResult.rows[0].id;

    // Fetch all participant responses
    const submissionsResult = await pool.query(
      `SELECT participant_name, participant_email, answers, created_at
       FROM participant_responses
       WHERE session_id = $1
       ORDER BY created_at ASC`,
      [sessionId]
    );

    console.log("📦 Submissions fetched:", submissionsResult.rows.length);

    res.json({ submissions: submissionsResult.rows });
  } catch (err) {
    console.error("❌ Error in getSubmissions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Publish results to participants via socket.io
export const publishResults = async (req, res) => {
  try {
    const { sessionCode } = req.params;
    console.log("🎯 publishResults called for sessionCode:", sessionCode);

    // Get session ID
    const sessionResult = await pool.query(
      "SELECT id FROM sessions WHERE code = $1",
      [sessionCode]
    );
    console.log("🔍 Session lookup result:", sessionResult.rows);

    if (!sessionResult.rows.length) {
      console.warn("⚠️ Session not found (publish):", sessionCode);
      return res.status(404).json({ message: "Session not found" });
    }

    // Notify all participants in this session room
    console.log("📢 Emitting 'resultsPublished' to room:", sessionCode);
    io.to(sessionCode).emit("resultsPublished", { message: "Results are ready!" });

    res.json({ message: "Results published!" });
  } catch (err) {
    console.error("❌ Error in publishResults:", err);
    res.status(500).json({ message: "Server error" });
  }
};


