var PORT  = process.env.PORT || 3000;  // heroku may setup or use 3000
var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

// socket.on needs 2 args (event as string + callbackfunc)
	socket.on('message', function (message) {  // listens for message 
		console.log('Message received: '+ message.text); // confirm message 

//broadcast.emit sends to everyone except sender  , io.emit sends to all incl. sender
		socket.broadcast.emit('message', message);      
	});
	socket.emit('message',{
		text: 'Welcome to the chat application!'

	});
});     // on lets you listen for events 



http.listen(PORT, function () {
	console.log('Server started')
});