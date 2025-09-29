
// src/controllers/participantController.js
import { findSessionByCode } from "../models/sessionModel.js";
import { addParticipantToSession } from "../models/participantModel.js";

// POST /api/participants/:sessionCode/join
export const joinSessionController = async (req, res) => {
  try {
    const { sessionCode } = req.params;
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if session exists
    const session = await findSessionByCode(sessionCode);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Add participant
    const participant = await addParticipantToSession(sessionCode, { name, email });

    // Return success response
    res.status(200).json({
      message: "Joined session successfully",
      session,
      participant,
    });
  } catch (err) {
    console.error("❌ Join Session Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
