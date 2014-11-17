
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
var messages=[];
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

  console.log('A User Connected' );

  //add user to users array
  users.push({id:id});

  //Increment user id
  id = id + 1;

  //emit to the client their id
  io.emit('connected',id);

  // Handle Message Event
  socket.on('submit', function(e){
    console.log(e);
  });

});

//////////////////////////////////
// Start Server
//////////////////////////////////

http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
