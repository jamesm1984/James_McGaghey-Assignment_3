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
			var message = "<li id='userID-" + userID + "'class='user'><p>" + users[userID].name + "</p></li>";
			$('#users_list').append(message);
		} else {
			var message = "<li id='userID-" + userID + "'class='user'><p>userID-" + userID + "</p></li>";
			$('#users_list').append(message);
		};

		for(i=0; i < users.length; i++){
			if (i!=userID && users[i].status === "connected"){
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
					if(users[i].name != name && users[i].status === "connected"){
						results.push(false);
					} else if(users[i].name === name && users[i].status === "connected"){
						results.push(true);
					}
				}

				filter = results.indexOf(true);

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
		var chat = $('#chat_window').html();
		if(users[id].name!=null){
			var message = "<div class='message'><span class='user_name'>" + users[id].name + ":</span><div class='content'>" + text + "</div></div><hr>";
		} else {
			var message = "<div class='message'><span class='user_name'> User-" + id + ":</span><div class='content'>" + text + "</div></div><hr>";
		}

		$('#chat_window').html("");
		$('#chat_window').html(chat+message);
	});
	socket.on('update_disconnect',function(id, users){
		$('#users_list').html('');

		if (users[userID].name != null){
			var message = "<li id='userID-" + userID + "'class='user'><p>" + users[userID].name + "</p></li>";
			$('#users_list').append(message);
		} else {
			var message = "<li id='userID-" + userID + "'class='user'><p>userID-" + userID + "</p></li>";
			$('#users_list').append(message);
		}
		for(i=0; i < users.length; i++){
			if (i!=userID && users[i].status === "connected"){
				if(users[i].name == null){
					var message = "<li id='userID-" + i + "'><p>userID-" + i + "</p></li>";
					$('#users_list').append(message);
				} else{
					var message = "<li id='userID-" + i + "'><p>" + users[i].name + "</p></li>";
					$('#users_list').append(message);
				}
			};
		};

		if(users[id].name === null){
			$('#chat_window').append("<p class='disconnected'>userID-" + id + " has disconnected</p>");
		} else{
			$('#chat_window').append("<p class='disconnected'>" + users[id].name + " has disconnected</p>");
		}

	});
	socket.on('update_username',function(id, users, prevName){
		if(prevName === null){
			$('#chat_window').append("<p class='changedNames'>userID-" + id + " has changed thier username to "+ users[id].name +"</p>");
		}else{
			$('#chat_window').append("<p class='changedNames'>" + prevName + " has changed thier username to "+ users[id].name +"</p>");
		};
		$('#users_list').html('');

		if (users[userID].name != null){
			var message = "<li id='userID-" + userID + "'class='user'><p>" + users[userID].name + "</p></li>";
			$('#users_list').append(message);
		} else {
			var message = "<li id='userID-" + userID + "'class='user'><p>userID-" + userID + "</p></li>";
			$('#users_list').append(message);
		}
		for(i=0; i < users.length; i++){
			if (i!=userID && users[i].status === "connected"){
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
					if(users[i].name != name && users[i].status === "connected"){
						results.push(false);
					} else if(users[i].name === name && users[i].status === "connected"){
						results.push(true);
					}
				}

				filter = results.indexOf(true);

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