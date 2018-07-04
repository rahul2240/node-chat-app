const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const PublicPath = path.join(__dirname, '../public');
const port = 3000;

app.use(express.static(PublicPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat application'
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'new user connected',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('New message is', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });



    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
