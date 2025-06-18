import express from "express";
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer(app);
import cors from "cors";
import { ACTIONS } from "./src/backend/actions.js";

app.use(
  cors({
    origin: [
      "https://real-time-code-editor-ten.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: [
      "https://real-time-code-editor-ten.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend server is running" });
});

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  const clientsArray = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

  // Use a Set to track unique usernames
  const uniqueClients = new Map();

  clientsArray.forEach((socketId) => {
    const username = userSocketMap[socketId];
    if (!uniqueClients.has(username)) {
      uniqueClients.set(username, { socketId, username });
    }
  });

  return Array.from(uniqueClients.values());
};

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    if (!username) {
      return; // Skip processing if username is not provided
    }

    userSocketMap[socket.id] = username; // Map the socket ID to the username
    socket.join(roomId); // Add the socket to the specified room

    // Filter clients to exclude those without a username
    const clients = getAllConnectedClients(roomId).filter(
      (client) => client.username
    );

    // Notify all valid clients in the room
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients, // Send only clients with valid usernames
        username, // Username of the joining user
        socketId: socket.id, // Joining user's socket ID
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
      code,
    });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
      code,
    });
  });

  socket.on("disconnecting", () => {
    const username = userSocketMap[socket.id];

    if (!username) return; // Avoid errors if username is not mapped

    // Find all socket IDs associated with the same username
    const relatedSocketIds = Object.entries(userSocketMap)
      .filter(([id, name]) => name === username)
      .map(([id]) => id);

    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      // Notify others in the room about the disconnection
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketIds: relatedSocketIds,
        username,
      });
    });

    // Clean up userSocketMap
    relatedSocketIds.forEach((id) => delete userSocketMap[id]);

    socket.leave(); // Ensure the socket leaves all rooms
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
