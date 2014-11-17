
// Wait for DOM to Load
jQuery(function($) {

    var userID;
    var firstConnection=true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    function addToChat(id){
      var newUser;
      var users_list = $('#users_list').html();
      console.log(id);
      newUser = "<li id='userID-" + id + "'>" + id + "</li>";

      $('#users_list').html(users_list + newUser);
    };

    socket.on('connected',function(id){
      addToChat(id);
      if(firstConnection){
      userID=id;
      firstConnection=false;
      }

      // Recieve Update Event From The Server
      socket.on('update', function(msg, id){
        var message = "<span class='user_name'> User-" + id + "</span> <p>" + msg + "</p>";
        console.log(msg, id);
        $('#chat_window').append(message);
      });

      // Send A Message To The Server
      $('#chat_submit').on('click', function(){
        var text = $('#chat_message').html();
        socket.emit('message', text, userID);
      });

    });

});