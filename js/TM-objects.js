'use strict'
var event = {
	// this is individual events for each record
	'strTask' : 'not set',
	"booActive" : false,
	"startTime" : "",
	"endTime" : "",
	"elapsedSeconds" : 0,
	"notes"	: "none", 
	"alarm" : { "booOn" : false,
				'startTime' : "",
				'period' : ""
			}

};

var events = [];

function show_event(obj_event){
	//var myObj = { 'name':'dhruv','age':28 };
//var theKey = 'name';
//alert(myObj.theKey);  // undefined
//alert(myObj[theKey]); // 28
//	var theKey = 'notes';
	return Object.values(obj_event);
//	var theKey = 'strTask';
//	alert('obj_event[theKey] = ' + obj_event[theKey]);
}
