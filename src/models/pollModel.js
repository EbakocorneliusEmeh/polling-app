// src/models/pollModel.js
import pool from "../config/db.js";

// Create a new poll with options
export const createPoll = async (sessionCode, question, options = [], type = "single-choice") => {
  if (!sessionCode || typeof sessionCode !== "string") {
    throw new Error("Invalid session code");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Step 1: Check session exists
    const sessionRes = await client.query(
      "SELECT id FROM sessions WHERE code = $1",
      [sessionCode]
    );
    if (sessionRes.rows.length === 0) {
      throw new Error(`Session with code "${sessionCode}" not found`);
    }
    const sessionId = sessionRes.rows[0].id;

    // Step 2: Insert poll
    const pollRes = await client.query(
      `INSERT INTO polls (session_id, question, type, code)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sessionId, question, type, sessionCode]
    );
    const poll = pollRes.rows[0];

    // Step 3: Insert options
    if ((type === "single-choice" || type === "multiple-choice") && options.length > 0) {
      const optionValues = options
        .map((opt) => `(${poll.id}, '${opt.text.replace(/'/g, "''")}')`)
        .join(",");
      await client.query(`INSERT INTO poll_options (poll_id, text) VALUES ${optionValues}`);
    }

    await client.query("COMMIT");

    // Step 4: Get options back
    const optionsRes = await client.query(
      "SELECT * FROM poll_options WHERE poll_id = $1",
      [poll.id]
    );
    poll.options = optionsRes.rows;

    return poll;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// Get all polls for a session
export const getPollsBySession = async (sessionCode) => {
  if (!sessionCode || typeof sessionCode !== "string") {
    throw new Error("Invalid session code");
  }

  const pollsRes = await pool.query(
    `SELECT p.* 
     FROM polls p
     JOIN sessions s ON p.session_id = s.id
     WHERE s.code = $1
     ORDER BY p.created_at DESC`,
    [sessionCode]
  );

  const polls = pollsRes.rows;

  for (let poll of polls) {
    const optionsRes = await pool.query(
      "SELECT * FROM poll_options WHERE poll_id = $1",
      [poll.id]
    );
    poll.options = optionsRes.rows;
  }

  return polls;
};

// Update poll status
export const updatePollStatus = async (pollId, status) => {
  const pollIdInt = parseInt(pollId, 10);
  if (isNaN(pollIdInt)) throw new Error("Invalid pollId");
  if (!["draft", "published", "closed"].includes(status)) throw new Error("Invalid status");

  const res = await pool.query(
    "UPDATE polls SET status = $1 WHERE id = $2 RETURNING *",
    [status, pollIdInt]
  );

  if (res.rows.length === 0) throw new Error("Poll not found");
  return res.rows[0];
};

// Delete poll
export const deletePoll = async (pollId) => {
  const pollIdInt = parseInt(pollId, 10);
  if (isNaN(pollIdInt)) throw new Error("Invalid pollId");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // delete options first (FK constraint)
    await client.query("DELETE FROM poll_options WHERE poll_id = $1", [pollIdInt]);

    const res = await client.query("DELETE FROM polls WHERE id = $1 RETURNING *", [pollIdInt]);

    await client.query("COMMIT");

    if (res.rows.length === 0) throw new Error("Poll not found");
    return res.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// Save a participant's response
export const saveResponse = async (pollId, participantId, optionId) => {
  const pollIdInt = parseInt(pollId, 10);
  const participantIdInt = parseInt(participantId, 10);
  const optionIdInt = parseInt(optionId, 10);

  if (isNaN(pollIdInt) || isNaN(participantIdInt) || isNaN(optionIdInt)) {
    throw new Error("Invalid pollId, participantId, or optionId");
  }

  const res = await pool.query(
    `INSERT INTO responses (poll_id, participant_id, option_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [pollIdInt, participantIdInt, optionIdInt]
  );

  return res.rows[0];
};
