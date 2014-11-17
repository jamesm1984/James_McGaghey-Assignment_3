
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

    // Handle device change
    var submitMessage = function() {
      var chat = $('#chat_window').html();
      var message = $('#chat_message').html();
      var message_string;
      console.log(message);
      message_string = chat + "<span class='user_name'>" + userID + "</span> <p>" + message + "</p>";

      $('#chat_window').html(message_string);

    };

    // Creates and event listener for clicking of submit button
    $('#chat_submit').click(submitMessage);


});