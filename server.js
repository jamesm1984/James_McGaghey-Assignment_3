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

  // store
  socket.uid = id;

  //add user to users array
  users.push({
    id:id,
    name:null,
    status:"connected"
  });

  console.log(users);

  //emit to the client their id
  io.emit('connected',id, users);

  // Handle Message Event
  socket.on('message', function(text, userID){
    io.emit('update', text, userID, users);
  });

  // Handle Message Event
  socket.on('username', function(name, userID){
    users[userID].name = name;
    io.emit('update_username', userID, users);
  });

  // Disconnect user
  socket.on('disconnect', function() {

    console.log(socket.uid);
    users[socket.uid].status = "disconnected";
    io.emit('update_disconnect', socket.uid, users);
    console.log("user " + socket.uid + " has disconnected!");

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