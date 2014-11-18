
//////////////////////////////////
// Require Native Node.js Libraries
//////////////////////////////////

var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);
var users=[];
var messages;
var id=0;
//////////////////////////////////
// Route our Assets
//////////////////////////////////

app.use('/assets/', express.static(__dirname + '/public/assets/'));

//////////////////////////////////
// Route our Home Page
//////////////////////////////////

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

//////////////////////////////////
// Handle Socket Connection
//////////////////////////////////

io.on('connection', function(socket){

  console.log('A User Connected' + id);

  //add user to users array
  // users.push({id:id});
  // users.push(socket);
  // console.log(users);


  //emit to the client their id
  io.emit('connected',id);


  // // Handles user connetions for adding to user list
  // socket.on('userConnected', function(userID){
  //   io.emit('userUpdate', userID);
  // });

  // Handle Message Event
  socket.on('message', function(text, userID){
    io.emit('update', text, userID);
    console.log(text, userID);
  });

  //Increment user id
  id = id + 1;
});

//////////////////////////////////
// Start Server
//////////////////////////////////

http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
