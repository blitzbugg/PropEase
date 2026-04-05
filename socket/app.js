import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Create an Express app
const app = express();

// Allow cross-origin requests from your deployed frontend
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173"
  ].filter(Boolean),
  methods: ["GET", "POST"],
  credentials: true,
}));

// Create HTTP server and bind Socket.IO to it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173"
    ].filter(Boolean),
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find(u => u.userId === userId);
  if (!userExists) onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(u => u.socketId !== socketId);
};

const getUser = (userId) => onlineUsers.find(u => u.userId === userId);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("User connected:", userId);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        ...data,
        chatId: String(data.chatId),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    removeUser(socket.id);
  });
});

// Health route so Render doesn't 404
app.get("/", (req, res) => {
  res.send("⚡ Socket server is running on Render!");
});

// Use the port Render provides
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Socket server running on port ${PORT}`));
