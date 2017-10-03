const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('new user connected');
  socket.emit('newEmail',{
    from: "Adil@example.com",
    text: "Hey, what is going on",
    createdAt: 123,
  });

  socket.emit('newMessage',{
    from : 'John',
    text : 'See you then',
    createdAt: 123
  });

socket.on('createMessage',(message)=>{
  console.log('Create Message',message);
});

  socket.on('disconnect',function() {
    console.log('Disconnected from server');
  });

});



server.listen(port,function(){
  console.log(`Server is up on port ${port}`);
})
