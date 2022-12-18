const express = require('express');

const { Server } = require("socket.io");

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
  console.log('new socket connection established\n' + socket);

  socket.emit('message', 'Welcome to application');

  socket.on('disconnect', () => {

  });
});



module.exports = io;
