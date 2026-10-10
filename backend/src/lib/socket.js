
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const allowedOrigin =
  process.env.FRONTEND_URL || 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
  },
});

// Online users map: { userId: socketId }
const userSocketMap = {};

// Get the socket ID of a receiver
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO connection handler
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  console.log('A user connected:', socket.id);

  // Store the user's socket ID
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);

    // Remove only if this socket is still the user's active socket
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }

    // Update online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, server, io, getReceiverSocketId };
