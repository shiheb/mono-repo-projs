const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const connectedUsers = [];
io.on("connection", (socket) => {
  connectedUsers.push(socket.id);
  socket.on("disconnect", () => {
    connectedUsers.splice(connectedUsers.indexOf(socket.id), 1);
    console.log("disconnected", connectedUsers);
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  setInterval(() => {
    socket.emit("liveUsers", {
      date: new Date(),
      usersNumber: connectedUsers.length,
    });
  }, 1000);
});

io.on("connection", (socket) => {
  socket.on("fromClient", (message) => {
    socket.broadcast.emit("fromServer", message);
  });
});

require("dotenv").config();
const PORT = process.env.PORT || 4545;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
