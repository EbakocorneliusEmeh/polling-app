// import { createPoll, getPollsBySession, updatePollStatus } from "../models/pollModel.js";

// // Create poll
// export const createPollController = async (req, res) => {
//   try {
//     // Try to read sessionCode from params OR body
//     const sessionCode = req.params.sessionCode || req.body.sessionCode;
//     const { question, options, type } = req.body;

//     if (!sessionCode) {
//       return res.status(400).json({ message: "Session code is required" });
//     }
//     if (!question || !type) {
//       return res.status(400).json({ message: "Question and type are required" });
//     }

//     if (
//       (type === "single-choice" || type === "multiple-choice") &&
//       (!options || options.length < 2)
//     ) {
//       return res.status(400).json({
//         message: "At least 2 options required for choice polls",
//       });
//     }

//     const poll = await createPoll(sessionCode, question, options || [], type);
//     res.status(201).json(poll);
//   } catch (err) {
//     console.error("Create Poll Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// // Get polls for a session
// export const getPollsController = async (req, res) => {
//   try {
//     const sessionCode = req.params.sessionCode || req.query.sessionCode;
//     if (!sessionCode) {
//       return res.status(400).json({ message: "Session code is required" });
//     }

//     const polls = await getPollsBySession(sessionCode);
//     res.json({ polls });
//   } catch (err) {
//     console.error("Get Polls Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// // Update poll status
// export const updatePollStatusController = async (req, res) => {
//   try {
//     const { pollId } = req.params;
//     const { status } = req.body;

//     if (!pollId) {
//       return res.status(400).json({ message: "Poll ID is required" });
//     }

//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     const poll = await updatePollStatus(pollId, status);
//     res.json(poll);
//   } catch (err) {
//     console.error("Update Poll Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };




// import { createPoll, getPollsBySession, updatePollStatus } from "../models/pollModel.js";

// // Create poll
// export const createPollController = async (req, res) => {
//   try {
//     const sessionCode = req.params.sessionCode || req.body.sessionCode;
//     const { question, options, type } = req.body;

//     if (!sessionCode) {
//       return res.status(400).json({ message: "Session code is required" });
//     }
//     if (!question || !type) {
//       return res.status(400).json({ message: "Question and type are required" });
//     }

//     const poll = await createPoll(sessionCode, question, options || [], type);

//     // ✅ Emit event to everyone in this session room
//     const io = req.app.get("io");
//     io.to(sessionCode).emit("pollCreated", poll);

//     res.status(201).json(poll);
//   } catch (err) {
//     console.error("Create Poll Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// // Get polls
// export const getPollsController = async (req, res) => {
//   try {
//     const sessionCode = req.params.sessionCode || req.query.sessionCode;
//     if (!sessionCode) {
//       return res.status(400).json({ message: "Session code is required" });
//     }

//     const polls = await getPollsBySession(sessionCode);
//     res.json({ polls });
//   } catch (err) {
//     console.error("Get Polls Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// // Update poll status
// export const updatePollStatusController = async (req, res) => {
//   try {
//     const { pollId } = req.params;
//     const { status } = req.body;

//     if (!pollId || !status) {
//       return res.status(400).json({ message: "Poll ID and status required" });
//     }

//     const poll = await updatePollStatus(pollId, status);

//     // ✅ Emit update event only to the correct session room
//     if (poll && poll.code) {
//       io.to(poll.code).emit("pollUpdated", poll);
//     }

//     res.json(poll);
//   } catch (err) {
//     console.error("Update Poll Error:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };



import { createPoll, getPollsBySession, updatePollStatus } from "../models/pollModel.js";

// Create poll
export const createPollController = async (req, res) => {
  try {
    const sessionCode = req.params.sessionCode || req.body.sessionCode;
    const { question, options, type } = req.body;

    if (!sessionCode) {
      return res.status(400).json({ message: "Session code is required" });
    }
    if (!question || !type) {
      return res.status(400).json({ message: "Question and type are required" });
    }

    const poll = await createPoll(sessionCode, question, options || [], type);

    // ✅ Emit event to everyone in this session room
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
    if (!sessionCode) {
      return res.status(400).json({ message: "Session code is required" });
    }

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

    const io = req.app.get("io"); // ✅ fixed
    if (poll && poll.code) {
      io.to(poll.code).emit("pollUpdated", poll);
    }

    res.json(poll);
  } catch (err) {
    console.error("Update Poll Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
