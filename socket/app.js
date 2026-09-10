import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Create an Express app
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

// Allow cross-origin requests
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Create HTTP server and bind Socket.IO to it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store active connections: array of { userId: string, socketId: string }
let onlineUsers = [];

const addUser = (userId, socketId) => {
  if (!userId) return;
  const strUserId = String(userId);
  // Remove any stale entries with this exact socketId
  onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
  // Add new user socket
  onlineUsers.push({ userId: strUserId, socketId });
  console.log(`[Socket] User ${strUserId} connected on socket ${socketId}. Total active sockets: ${onlineUsers.length}`);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
  console.log(`[Socket] Socket ${socketId} disconnected. Total active sockets: ${onlineUsers.length}`);
};

const getSocketsByUserId = (userId) => {
  if (!userId) return [];
  const strUserId = String(userId);
  return onlineUsers
    .filter((u) => String(u.userId) === strUserId)
    .map((u) => u.socketId);
};

io.on("connection", (socket) => {
  console.log("[Socket] New connection established:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    if (!receiverId || !data) {
      console.warn("[Socket] sendMessage called with missing receiverId or data:", { receiverId, data });
      return;
    }

    const receiverSockets = getSocketsByUserId(receiverId);
    console.log(`[Socket] Relaying message to receiver ${receiverId} across ${receiverSockets.length} socket(s)`);

    if (receiverSockets.length > 0) {
      receiverSockets.forEach((sockId) => {
        io.to(sockId).emit("getMessage", {
          ...data,
          chatId: String(data.chatId),
        });
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// Health route so Render or uptime checks don't 404
app.get("/", (req, res) => {
  res.send("⚡ Socket server is running!");
});

// Use the port Render or local env provides
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`⚡ Socket server running on port ${PORT}`));
