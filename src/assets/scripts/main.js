
// Wait for DOM to Load
jQuery(function($) {

    var userID;
    var firstConnection=true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    socket.on('connected',function(id){
      if(firstConnection){
      userID=id;
      firstConnection=false;
      }
    });

});