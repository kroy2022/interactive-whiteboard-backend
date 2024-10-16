const express = require('express');
const { Server } = require('socket.io'); // Make sure to import Server from socket.io
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create a new instance of the Server class
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to match your frontend
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('canvasImage', (data) => {
    // Broadcast the canvas image to all other clients
    socket.broadcast.emit('canvasImage', data);
  });

  socket.on('addText', (data) => {
    // Broadcast the text addition to all other clients
    socket.broadcast.emit('addText', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
