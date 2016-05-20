// all app js stored here 

var  name = getQueryVariable('name') || 'Anonymous';
var  room = getQueryVariable('room');
var  socket = io(); 

console.log(name + ' ' + 'wants to join ' + room); // currently manually entering into url then refresh 


socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

// when message comes in modify below with ts 

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);  //after parsed as utc 
	var $message = jQuery('.messages');      // to split it for multiple references

	console.log('New Message:');
	console.log(message.text); 

// then call moment timestamp cancatenate to message.text
//	jQuery('.messages').append('<p><strong>'+ momentTimestamp.local().format('h:mm a: ') +'</strong>' + message.text +'</p>');  // to go with the div class (use .) in html when msg comein
//	Split the above line into 2 for readbility 

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a:') + '</strong></p>');
	$message.append('<p>' + message.text +'</p>');
});
// socket.emit('message',
//	text: 'Welcome to the chat application! - app.js'
// });});
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
		name: name,					// name var as in line1 
		text: $message.val()	// set to value of input by calling method and find inside of message
										// and search by attribute [] & pull value out and pass as a string 	});
	}); 
	//$form.find('input{name=message') 		// do the find 
	$message.val('');						// send empty string to clear msg
	// erase the message after its sent  - access jQuery via find to find same one and select it 

});

