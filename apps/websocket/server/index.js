const express = require('express');
const cors = require('cors');

const http = require('http');
const app = express();

app.use(cors());

const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const connectedUsers = [];
io.on('connection', (socket) => {
  console.log('a user connected');
  connectedUsers.push({ id: socket.id, name: '', likedBy: [] });
  socket.on('disconnect', () => {
    const userIndex = connectedUsers.findIndex((user) => user.id === socket.id);
    connectedUsers.splice(userIndex, 1);
    console.log('disconnected', connectedUsers);
  });
  setInterval(() => {
    socket.emit('liveUsers', {
      date: new Date(),
      usersNumber: connectedUsers.length,
    });
  }, 1000);

  socket.on('fromClient', (message) => {
    io.broadcast.emit('fromServer', message);
  });

  socket.on('newUser', (userName) => {
    const userIndex = connectedUsers.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
      connectedUsers[userIndex].name = userName;
    } else connectedUsers.push({ id: socket.id, name: userName, likedBy: [] });
    console.log({ connectedUsers });
    io.emit('connectedUsers', connectedUsers);
  });

  socket.on('like', (recipient, sender) => {
    const recipientIndex = connectedUsers.findIndex(
      (user) => user.name === recipient
    );
    if (
      recipientIndex !== -1 &&
      !connectedUsers[recipientIndex].likedBy.includes(sender)
    ) {
      connectedUsers[recipientIndex].likedBy.push(sender);
    }
    socket
      .to(connectedUsers[recipientIndex].id)
      .emit('connectedUsers', connectedUsers);
  });
});

require('dotenv').config();
const PORT = process.env.PORT || 4545;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
