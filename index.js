

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import pollRoutes from "./src/routes/pollRoutes.js";
import participantRoutes from "./src/routes/participantRoutes.js";
import responseRoutes from "./src/routes/responseRoutes.js";
import resultsRoutes from "./src/routes/resultsRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);

// ✅ Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Make Socket.IO accessible in routes/controllers
app.set("io", io);

// ✅ Socket.IO connection
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Join session rooms
  socket.on("joinSession", (sessionCode) => {
    socket.join(sessionCode);
    console.log(`📢 User ${socket.id} joined session ${sessionCode}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);                  // Auth
app.use("/api/sessions", sessionRoutes);          // Sessions CRUD
app.use("/api/sessions", pollRoutes);             // Polls
app.use("/api/participants", participantRoutes);  // Participants
app.use("/api/sessions", responseRoutes);         // Participant responses
console.log("📌 Mounting results routes at /api/sessions");
// app.use("/api/sessions", resultsRoutes);

app.use("/api/sessions", resultsRoutes);          // Results / submissions

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
