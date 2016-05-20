// all app js stored here 
var  socket = io(); 
socket.on('connect', function(){
	console.log('Connected to socket.io server');
});


socket.on('message', function (message) {
	console.log('New Message:');
	console.log(message.text); 

// socket.emit('message',{
//	text: 'Welcome to the chat application! - app.js'
// });


});
// now ready to fill out code 

// handles submitting of new message 
var $form = jQuery('#message-form'); // select any title tag  (or input or p or form id )
// only argument passed to jquery is a selector - a way to pick element out of html 
// $ indicates this method has access to any jQuery element 
// 

$form.on('submit', function (event){   
// submit almost all browsers recog and 2nd arg anonymous fcn  gets passed an argument that stores the event 

// call method on the event obj only every going to be using  method type = default 
	event.preventDefault();   // to handle submission on ur own instead of waiting
// actually send message to the server

	var $message= $form.find('input[name=message]')	 //combine the 2 

	socket.emit('message', {		// event + object (text in this case)
		text: $message.val()	// set to value of input by calling method and find inside of message
										// and search by attribute [] & pull value out and pass as a string 	});
	}); 
	//$form.find('input{name=message') 		// do the find 
	$message.val('');						// send empty string to clear msg
	// erase the message after its sent  - access jQuery via find to find same one and select it 

});

