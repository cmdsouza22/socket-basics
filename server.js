var PORT  = process.env.PORT || 3000;  // heroku may setup or use 3000
var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function() {
	console.log('User connected via socket.io!');
})     // on lets you listen for events 



http.listen(PORT, function () {
	console.log('Server started')
});