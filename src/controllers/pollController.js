// src/controllers/pollController.js
import {
  createPoll,
  getPollsBySession,
  updatePollStatus,
  deletePoll,
  saveResponse,
} from "../models/pollModel.js";

// Create poll
export const createPollController = async (req, res) => {
  try {
    const sessionCode = req.params.sessionCode || req.body.sessionCode;
    const { question, options, type } = req.body;

    if (!sessionCode) return res.status(400).json({ message: "Session code is required" });
    if (!question || !type) return res.status(400).json({ message: "Question and type are required" });

    const poll = await createPoll(sessionCode, question, options || [], type);

    // emit event
    const io = req.app.get("io");
    io.to(sessionCode).emit("pollCreated", poll);

    res.status(201).json(poll);
  } catch (err) {
    console.error("Create Poll Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Get polls
export const getPollsController = async (req, res) => {
  try {
    const sessionCode = req.params.sessionCode || req.query.sessionCode;
    if (!sessionCode) return res.status(400).json({ message: "Session code is required" });

    const polls = await getPollsBySession(sessionCode);
    res.json({ polls });
  } catch (err) {
    console.error("Get Polls Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Update poll status
export const updatePollStatusController = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { status } = req.body;

    if (!pollId || !status) {
      return res.status(400).json({ message: "Poll ID and status required" });
    }

    const poll = await updatePollStatus(pollId, status);

    const io = req.app.get("io");
    if (poll && poll.code) {
      io.to(poll.code).emit("pollUpdated", poll);
    }

    res.json(poll);
  } catch (err) {
    console.error("Update Poll Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Delete poll
export const deletePollController = async (req, res) => {
  try {
    const { pollId } = req.params; 
    console.log("🗑️ Deleting poll => pollId:", pollId);

    await deletePoll(pollId); // ✅ FIX: only pass pollId
    res.json({ message: "Poll deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Poll Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Save participant response
export const submitResponseController = async (req, res) => {
  try {
    const { pollId, participantId, optionId } = req.body;

    if (!pollId || !participantId || !optionId) {
      return res.status(400).json({ message: "pollId, participantId, and optionId are required" });
    }

    const response = await saveResponse(pollId, participantId, optionId);

    const io = req.app.get("io");
    io.to(response.poll_id).emit("responseSubmitted", response);

    res.status(201).json({ message: "Response saved", response });
  } catch (err) {
    console.error("Error saving response:", err);
    res.status(500).json({ message: "Error saving response" });
  }
};
