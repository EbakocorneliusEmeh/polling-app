// // index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// // Routes
// import authRoutes from "./src/routes/authRoutes.js";
// import sessionRoutes from "./src/routes/sessionRoutes.js";
// import pollRoutes from "./src/routes/pollRoutes.js";


// dotenv.config();
// const app = express();

// // Enable CORS
// app.use(cors({
//   origin: "http://localhost:5173", // frontend URL
//   credentials: true,
// }));

// // Parse JSON bodies
// app.use(express.json());

// // Mount routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sessionRoutes); // session routes
// app.use("/api/sessions", pollRoutes);    // poll routes nested under sessions
// app.use("/api", pollRoutes);


// // Test database URL
// console.log("DATABASE_URL =", process.env.DATABASE_URL);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));




// // index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";

// // Routes
// import authRoutes from "./src/routes/authRoutes.js";
// import sessionRoutes from "./src/routes/sessionRoutes.js";
// import pollRoutes from "./src/routes/pollRoutes.js";

// dotenv.config();
// const app = express();
// const server = createServer(app);

// // ✅ Attach socket.io
// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   },
// });
// app.set("io", io)
// // ✅ Listen for connections
// io.on("connection", (socket) => {
//   console.log("🔌 A user connected:", socket.id);

//   // Join session rooms
//   socket.on("joinSession", (sessionCode) => {
//     socket.join(sessionCode);
//     console.log(`📢 User ${socket.id} joined session ${sessionCode}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sessionRoutes); 
// app.use("/api/sessions", pollRoutes);    // ✅ keep only this, remove app.use("/api", pollRoutes)

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



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


// ... existing middleware



dotenv.config();
const app = express();
const server = createServer(app);

// ✅ Attach socket.io
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
app.set("io", io);

// ✅ Listen for connections
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

// Middleware
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/sessions", pollRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/sessions", responseRoutes);



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
