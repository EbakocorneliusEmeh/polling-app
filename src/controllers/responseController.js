// import { saveParticipantResponses } from "../models/responseModel.js";
// import { findParticipantBySessionCodeAndEmail } from "../models/participantModel.js";

// export const submitResponsesController = async (req, res) => {
//   try {
//     const { sessionCode } = req.params;
//     const { participantEmail, answers } = req.body;

//     if (!participantEmail || !answers) {
//       return res.status(400).json({ message: "Participant email and answers are required" });
//     }

//     const participant = await findParticipantBySessionCodeAndEmail(sessionCode, participantEmail);
//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     await saveParticipantResponses(participant.id, sessionCode, answers);

//     res.json({ message: "Responses submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// // src/controllers/responseController.js
// import { saveResponses } from "../models/responseModel.js";

// export const submitResponses = async (req, res) => {
//   const { sessionCode } = req.params;
//   const { email, responses } = req.body;

//   if (!email || !responses || !Array.isArray(responses) || responses.length === 0) {
//     return res.status(400).json({ message: "Participant email and answers are required" });
//   }

//   try {
//     await saveResponses(sessionCode, email, responses);
//     res.json({ message: "Responses submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error saving responses" });
//   }
// };


// import { saveResponses, getResponsesBySession } from "../models/responseModel.js";

// // Save participant responses
// export const submitResponses = async (req, res) => {
//   const { sessionCode } = req.params;
//   const { email, responses } = req.body;

//   if (!email || !responses || !Array.isArray(responses) || responses.length === 0) {
//     return res.status(400).json({ message: "Participant email and answers are required" });
//   }

//   try {
//     await saveResponses(sessionCode, email, responses);
//     res.json({ message: "Responses submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error saving responses" });
//   }
// };

// // 🔥 NEW: Get all responses for a session
// export const getSessionResponses = async (req, res) => {
//   const { sessionCode } = req.params;
//   try {
//     const submissions = await getResponsesBySession(sessionCode);
//     res.json({ submissions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching responses" });
//   }
// };


// // src/controllers/responseController.js
// import { saveResponses, getResponsesBySession } from "../models/responseModel.js";

// // Save participant responses
// export const submitResponses = async (req, res) => {
//   const { sessionCode } = req.params;
//   const { email, responses } = req.body;

//   if (!email || !responses || !Array.isArray(responses) || responses.length === 0) {
//     return res.status(400).json({ message: "Participant email and answers are required" });
//   }

//   try {
//     await saveResponses(sessionCode, email, responses);

//     // ✅ Emit event so host sees it live
//     const io = req.app.get("io");
//     io.to(sessionCode).emit("newResponse", { participant_email: email, answers: responses });

//     res.json({ message: "Responses submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error saving responses" });
//   }
// };

// // Get all responses for a session
// export const getSessionResponses = async (req, res) => {
//   const { sessionCode } = req.params;
//   try {
//     const submissions = await getResponsesBySession(sessionCode);
//     res.json({ submissions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching responses" });
//   }
// };


// src/controllers/responseController.js
import { saveResponses, getResponsesBySession } from "../models/responseModel.js";

// Save participant responses
export const submitResponses = async (req, res) => {
  const { sessionCode } = req.params;
  const { participantEmail, responses } = req.body;  // 👈 use participantEmail (consistent with model)

  if (!participantEmail || !responses || !Array.isArray(responses) || responses.length === 0) {
    return res
      .status(400)
      .json({ message: "Participant email and responses are required" });
  }

  try {
    // Save into DB
    await saveResponses(sessionCode, participantEmail, responses);

    // ✅ Emit event so host sees it live
    const io = req.app.get("io");
    io.to(sessionCode).emit("newResponse", {
      participant_email: participantEmail,
      answers: responses,
    });

    res.json({ message: "Responses submitted successfully" });
  } catch (err) {
    console.error("❌ Error saving responses:", err);
    res.status(500).json({ message: "Error saving responses" });
  }
};

// Get all responses for a session
export const getSessionResponses = async (req, res) => {
  const { sessionCode } = req.params;
  try {
    const submissions = await getResponsesBySession(sessionCode);
    res.json({ submissions });
  } catch (err) {
    console.error("❌ Error fetching responses:", err);
    res.status(500).json({ message: "Error fetching responses" });
  }
};
