var PORT  = process.env.PORT || 3000;  // heroku may setup or use 3000
var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();  // now var = moment object to manipulate time

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

// socket.on needs 2 args (event as string + callbackfunc)
	socket.on('message', function (message) {  // listens for message 
		console.log('Message received: '+ message.text); // confirm message 

//broadcast.emit sends to everyone except sender  , io.emit sends to all incl. sender
	// timestamp property = Javascript timestamp (milliseconds)
		message.timestamp = moment().valueOf(); 
		io.emit('message', message);         // individual msg
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