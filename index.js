const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

//Whenever someone connects this gets executed
var clients = 0;
var users = [];
var messages = [];

io.on('connection', function (socket) {
  clients++;

  console.log('A user connected');

  socket.on('chat', function (data) {
    if (users.indexOf(data.user) == -1) {
      users.push(data.user);
    }

    // for(message in messages){
    //   socket.send(message);
    // }

    messages.push(data);

    console.log(messages);

    io.sockets.emit('broadcast', data);
  });

  socket.on('conn',function(data){
    for(message of messages){
      console.log(message);
      socket.emit('chatPreload',message);
    }
  })

  socket.on('disconnect', function () {
    clients--;
    io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});