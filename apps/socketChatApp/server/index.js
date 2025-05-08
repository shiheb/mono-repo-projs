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

io.use((socket, next) => {
  const userName = socket.handshake.auth.userName;
  const customID = socket.handshake.auth.customID;

  if (!userName) {
    return next(new Error("missing user name"));
  }
  socket.userName = userName;
  socket.id = customID;
  next();
});

const connectedUsers = [];

io.on("connection", (socket) => {
  const userIndex = connectedUsers.findIndex(
    (user) => user.userName === socket.userName
  );
  if (userIndex === -1) {
    console.log("connection, user now exists");
    connectedUsers.push({
      userId: socket.id,
      userName: socket.userName,
      connected: true,
    });

    socket.broadcast.emit("user connected", {
      userId: socket.id,
      userName: socket.userName,
      connected: true,
    });

    console.log({ connectedUsers });
  } else {
    connectedUsers[userIndex].connected = true;
    connectedUsers[userIndex].userId = socket.id;
    console.log("reconnect: ", connectedUsers);
    socket.broadcast.emit("user connected", {
      userId: socket.id,
      userName: socket.userName,
      connected: true,
    });
  }

  socket.emit("users", connectedUsers);

  socket.on("chat message", ({ message, to, from }) => {
    console.log(to, from);
    io.to(to).to(from).emit("chat message", { message, to, from });
  });

  socket.on("disconnect", () => {
    const disconnectIndex = connectedUsers.findIndex(
      (user) => user.userName === socket.userName
    );
    if (disconnectIndex !== -1) {
      // with next line we completely remove user form chats
      // connectedUsers.splice(disconnectIndex, 1);
      // or we can keep them but change the status to disconnected
      connectedUsers[disconnectIndex].connected = false;
      socket.broadcast.emit("users", connectedUsers);
    }
  });
});

require("dotenv").config();
const PORT = process.env.PORT || 4545;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
