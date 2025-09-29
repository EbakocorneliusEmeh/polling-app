// import pool from "../config/db.js";

// // Save participant answers
// export const saveParticipantResponses = async (participantId, sessionCode, answers) => {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");

//     for (const pollId in answers) {
//       const answer = answers[pollId];

//       if (Array.isArray(answer)) {
//         // Multiple-choice
//         for (const optId of answer) {
//           await client.query(
//             "INSERT INTO responses (participant_id, poll_id, option_id) VALUES ($1, $2, $3)",
//             [participantId, pollId, optId]
//           );
//         }
//       } else {
//         // Single-choice or open-ended
//         await client.query(
//           "INSERT INTO responses (participant_id, poll_id, option_id, text_answer) VALUES ($1, $2, $3, $4)",
//           [participantId, pollId, typeof answer === "string" ? null : answer, typeof answer === "string" ? answer : null]
//         );
//       }
//     }

//     await client.query("COMMIT");
//     return true;
//   } catch (err) {
//     await client.query("ROLLBACK");
//     throw err;
//   } finally {
//     client.release();
//   }
// };


// src/models/responseModel.js
import pool from "../config/db.js";

/**
 * Save participant responses
 * @param {string} sessionCode
 * @param {string} participantEmail
 * @param {Array} responses - array of { pollId, optionId?, text? }
 * @returns {Promise<void>}
 */
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
