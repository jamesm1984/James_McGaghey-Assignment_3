
// Wait for DOM to Load
jQuery(function($) {

    var userID;
    var firstConnection=true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    socket.on('connected',function(id, users){
      console.log(users);


      var message = "<li id='userID-" + id + "' class='current_user'>userID-" + id + "</li>";
      $('#users_list').append(message);
      for(var i=0; i>users.length; i++){
        console.log(i);
      }
      if(firstConnection){
        userID=id;
        firstConnection=false;
      }


    });

    // Send A Message To The Server
    $('#chat_submit').on('click', function(){
      var text = $('#chat_message').html();
      socket.emit('message', text, userID);
    });

    // Recieve Update Event From The Server
    socket.on('update', function(msg, id){
      var message = "<span class='user_name'> User-" + id + "</span> <p>" + msg + "</p>";
      var chat = $('#chat_window').html();
      $('#chat_window').html("");

      $('#chat_window').html(chat+message+"<br>");

    });

});