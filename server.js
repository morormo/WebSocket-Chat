const express = require('express');
const path = require('path');
const socket = require('socket.io');
const io = socket(server);

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
  });

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  console.log('I\'ve added a listener on message event \n');
});