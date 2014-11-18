
// Wait for DOM to Load
jQuery(function($) {

    var userID;
    var firstConnection=true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    socket.on('connected',function(id, users){

      if(firstConnection){
        userID=id;
        firstConnection=false;
      }

      $('#users_list').html('');

      if (users[userID].name != null){
        var message = "<li id='userID-" + id + "'class='user'><p>" + users[userID].name + "</p></li>";
        $('#users_list').append(message);
      } else {
        var message = "<li id='userID-" + id + "'class='user'><p>userID-" + id + "</p></li>";
        $('#users_list').append(message);
      }

      for(i=0; i < users.length; i++){
        if (i!=userID){
          if(users[i].name == null){
            var message = "<li id='userID-" + i + "'><p>userID-" + i + "</p></li>";
            $('#users_list').append(message);
          } else{
            var message = "<li id='userID-" + i + "'><p>" + users[i].name + "</p></li>";
            $('#users_list').append(message);
          }
        };
      };

      $('.user').on('click', function(){

        var name;
        var results=[];
        var filter;

        name = window.prompt("Enter your custom username must be less then 10 characters", "Username");

        function checkForDuplicates(){
          for (i=0; i<users.length; i++){

            if(users[i].name != name){
              results.push(false);
            } else{
              results.push(true);
            }

          }

          filter = results.indexOf(true);
          console.log(name.length);
          if(filter >=0 && name.length>10 || filter >=0 || name.length>10 || name == ""){
            name = window.prompt("It appears someone already has that username or username was over 10 characters please try again", "Username");
            results=[];
            checkForDuplicates()
          }else{
            socket.emit('username', name, userID);
          }
        }

        checkForDuplicates()

      });

    });

    // Send A Message To The Server
    $('#chat_submit').on('click', function(){
      var text = $('#chat_message').html();
      socket.emit('message', text, userID);
    });



    // Recieve Update Event From The Server
    socket.on('update', function(text, id, users){
      if(users[id].name!=null){
        var message = "<span class='user_name'>" + users[id].name + "</span> <p>" + text + "</p><hr>";
      } else {
        var message = "<span class='user_name'> User-" + id + "</span> <p>" + text + "</p><hr>";
      }


      var chat = $('#chat_window').html();
      $('#chat_window').html("");

      $('#chat_window').html(chat+message+"<br>");

    });

    socket.on('update_username',function(id, users){
      console.log(users);
      $('#users_list').html('');

      if (users[userID].name != null){
        var message = "<li id='userID-" + id + "'class='user'><p>" + users[userID].name + "</p></li>";
        $('#users_list').append(message);
      } else {
        var message = "<li id='userID-" + id + "'class='user'><p>userID-" + id + "</p></li>";
        $('#users_list').append(message);
      }


      for(i=0; i < users.length; i++){
        if (i!=userID){
          if(users[i].name == null){
            var message = "<li id='userID-" + i + "'><p>userID-" + i + "</p></li>";
            $('#users_list').append(message);
          } else{
            var message = "<li id='userID-" + i + "'><p>" + users[i].name + "</p></li>";
            $('#users_list').append(message);
          }
        };

      };
      $('.user').on('click', function(){

        var name;
        var results=[];
        var filter;

        name = window.prompt("Enter your custom username must be less then 10 characters", "Username");

        function checkForDuplicates(){
          for (i=0; i<users.length; i++){

            if(users[i].name != name){
              results.push(false);
            } else{
              results.push(true);
            }

          }

          filter = results.indexOf(true);
          console.log(name.length);
          if(filter >=0 && name.length>10 || filter >=0 || name.length>10 || name == ""){
            name = window.prompt("It appears someone already has that username or username was over 10 characters please try again", "Username");
            results=[];
            checkForDuplicates()
          }else{
            socket.emit('username', name, userID);
          }
        }

        checkForDuplicates()

      });
    });

});