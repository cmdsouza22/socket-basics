var PORT  = process.env.PORT || 3000;  // heroku may setup or use 3000
var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();  // now var = moment object to manipulate time

app.use(express.static(__dirname + '/public'));

var clientInfo = {};  //set of key value pairs socket io auto generates with values that user joined roomid

// Sends current users to provided socket 
function sendCurrentUsers (socket) {   		//user socket id to find which room
	var info = clientInfo[socket.id];
	var users = [];    						// push elements as we find them 

	if (typeof info === 'undefined') {		// if room exists 
		return; 
	}

	Object.keys(clientInfo).forEach(function (socketId) {		//loop thru till find match room 
		var userInfo = clientInfo[socketId];

		if(info.room === userInfo.room) {		// compare  with users in room
			users.push(userInfo.name);

		}
	});

	socket.emit('message', {
			name: 'System',
			text: 'Current users: ' + users.join(', '), 		// takes every element, converts to string & pushes together
			timestamp: moment().valueOf()
	});

}

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

	socket.on('disconnect', function () {    //disconnect built in socket.io
		// check if data for this user?
		var userData = clientInfo[socket.id];

		if (typeof userData !== 'undefined') {   // if exists 
			socket.leave(userData.room);   	//user disconnected
			io.to(userData.room).emit('message', {     //pass in room name + emit message event
				name: 'System',
				text: userData.name + ' has left',
				timestamp: moment().valueOf()
			});
		// delet client data 
		 	delete clientInfo[socket.id];
		}
	}); 

//adding code for joining rooms
	socket.on('joinRoom', function (req) {
		clientInfo[socket.id]= req;  // use [] to pass in the variable
		socket.join(req.room);				//tells socket.io to join to a specific room 
		socket.broadcast.to(req.room).emit('message', {	 //broadcast 'to' specific room that the user joined  
			name: 'System',
			text: req.name + 'has joined!',
			timestamp: moment().valueOf()

		});      
	});


// socket.on needs 2 args (event as string + callbackfunc)
	socket.on('message', function (message) {  // listens for message 
		console.log('Message received: '+ message.text); // confirm message 

		if (message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
//broadcast.emit sends to everyone except sender  , io.emit sends to all incl. sender
	// timestamp property = Javascript timestamp (milliseconds)
			message.timestamp = moment().valueOf();  // individual msg
			io.to(clientInfo[socket.id].room).emit('message', message);   // only broadcasts to users in same room      
		}
	});



	socket.emit('message',{
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()  // emit system msg
	});

});     // on lets you listen for events 



http.listen(PORT, function () {
	console.log('Server started')
});