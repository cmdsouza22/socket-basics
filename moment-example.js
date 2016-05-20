var moment = require('moment');
var now = moment();  // now var = moment object to manipulate time 

console.log(now.format());
// add and subtract units of time 
//now.subtract(1, 'year');


	//console.log(now.format('h:mma'));  //6:45pm

// add the month and the day of the month  // Oct 5th 2015,  6:45pm 

// console.log(now.format('MMM Do YYYY, h:mma'));   // printed May 20th 2015, 1:20pm


// console.log(now.format(now.format('X'))); // seconds since that moment - Prints 1432143742
//  console.log(now.format('x'));  // millisecs as in javascript 

// comparing time with timestams epochconverter.com
console.log(now.valueOf());  // prints 1463766440415  = use this for calcs 

var timestamp = 1463767995346;
var timestampMoment = moment.utc(timestamp);  // telling moment passing in utc 

console.log(timestampMoment.format());

//Challenge finish the rest - frontend will call timestampMoment So how to convert MomentTimeStamp into the 11:06 am string 
// Hint - pass in the appropriate function informat to display // 11:06 am 
// add .local() to offset utc 

console.log(timestampMoment.local().format('h:mm a'));