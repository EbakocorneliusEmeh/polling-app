import pool from "../config/db.js";

export const saveResponses = async (sessionCode, participantEmail, responses) => {
  try {
    const queryText =
      "INSERT INTO responses (session_code, participant_email, poll_id, option_id, text) VALUES ($1, $2, $3, $4, $5)";

    for (let r of responses) {
      await pool.query(queryText, [
        sessionCode,
        participantEmail,
        r.pollId,
        r.optionId || null,
        r.text || null,
      ]);
    }
  } catch (err) {
    console.error("❌ saveResponses error:", err);
    throw err;
  }
};

// 🔥 Fetch all responses for a session, grouped by participant → then by poll
export const getResponsesBySession = async (sessionCode) => {
  try {
    const result = await pool.query(
      `SELECT participant_email, poll_id, option_id, text, created_at
       FROM responses
       WHERE session_code = $1
       ORDER BY created_at DESC`,
      [sessionCode]
    );

    // Group by participant, then by pollId
    const grouped = {};
    result.rows.forEach((row) => {
      if (!grouped[row.participant_email]) {
        grouped[row.participant_email] = {};
      }
      if (!grouped[row.participant_email][row.poll_id]) {
        grouped[row.participant_email][row.poll_id] = [];
      }

      grouped[row.participant_email][row.poll_id].push({
        optionId: row.option_id,
        text: row.text,
        createdAt: row.created_at,
      });
    });

    // Convert into clean array format
    return Object.entries(grouped).map(([email, polls]) => ({
      participant_email: email,
      polls: Object.entries(polls).map(([pollId, answers]) => ({
        pollId: Number(pollId),
        answers,
      })),
    }));
  } catch (err) {
    console.error("❌ getResponsesBySession error:", err);
    throw err;
  }
};
