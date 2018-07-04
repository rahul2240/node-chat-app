const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const PublicPath = path.join(__dirname, '../public');
const port = 3000;

const {generateMessage} = require('./utils/message');

app.use(express.static(PublicPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage( 'Admin', 'Welcome to chat application'))



  socket.broadcast.emit('newMessage', generateMessage('admin','new user connected'))

  socket.on('createMessage', (message) => {
    console.log('New message is', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });



    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
