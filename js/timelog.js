'use strict'
var OFF = true;

var timeLog = { events :[
		{
		task :'Task',
		fdate :'Finish Date',
		ftime :'Finish Time',
		time :'Task Time(s)',
		notes : 'Notes',
		results : 'Results' 
	}]
};

var broken_event = {};


$('#myModal').on('hidden.bs.modal', function (e) {
  console.log("modal closed");
})

function close_modoal(){
$('#modal').modal('hide');
}

function save_to_local_storage(ls_name , obj_to_store){
// Put the object into storage
//alert('save_to_local_storage(' + ls_name + ' , ' + obj_to_store + ' ) ');
localStorage.setItem(ls_name, JSON.stringify(obj_to_store));
//why is starttime different format
}

function saveLog(){
// Put the object into storage
//rewrites log every time
//called from stuffit2
//alert('In saveLog');
localStorage.setItem('timeLog', JSON.stringify(timeLog));
}

function displayLog(){
	//console.log('in display');
	//alert('display log');
	retrieveLog();
	var size = timeLog.events.length ;
	var logData="";
	for(var i =0; i< size ; i++){
		logData = logData + timeLog.events[i].task + " ," +
			timeLog.events[i].fdate + " , " +
			timeLog.events[i].ftime + " , " +
			timeLog.events[i].time + " , " +
			timeLog.events[i].notes + " , " +
			timeLog.events[i].results + "\r\n" ;
	//	$('#debug').html('events Data No Records = ' +  timeLog.events.length +'\r\n' + logData);
	}
	//throw log into textarea textbox-log
	var obj_tblog = document.getElementById('textbox-log');	obj_tblog.value = logData;
    //var obj_tbsum = document.getElementById('textbox-summary');	obj_tbsum.value = 'Textbox_summary :\n' +  logData;
    //obj_tbsum.focus();
    //obj_tbsum.select();
	obj_tblog.focus();
    obj_tblog.select();
	
}

 function summarizeLog(){
	//alert('in summarizeLog()');
    var arrLogSum = ['Total'];
    var arrLogSumValue = [0];
	retrieveLog();
	var size = timeLog.events.length ;
	var logData="";
    var index = 0;
    //start at one to eliminate header
	for(var i =1; i< size ; i++){
            // see if in array if so update time
		   if (arrLogSum.includes(timeLog.events[i].task)) {
               //alert(timeLog.events[i].task + ' is at index ' + arrLogSum.indexOf(timeLog.events[i].task));
               index = arrLogSum.indexOf(timeLog.events[i].task);
               arrLogSumValue[index]  = arrLogSumValue[index] + timeLog.events[i].time;
           }
           //not in array so add it
           else {
               arrLogSum.push(timeLog.events[i].task);
               index = arrLogSum.indexOf(timeLog.events[i].task);
               arrLogSumValue[index] =  timeLog.events[i].time;
           }

	}
    var strSummary = ''
    size= arrLogSum.length;
    //start at one to eliminate header
    for( var i = 1; i < size; i++){
        //alert('in');
        strSummary = strSummary + arrLogSum[i] + ':' + arrLogSumValue[i] + '\n';
    }
    
    
    
    
    
    
	//throw log into textarea textbox-log
    var obj_tbsum = document.getElementById('textbox-summary');	obj_tbsum.value = 'Textbox_summary :\n' +  strSummary;
    obj_tbsum.focus();
    obj_tbsum.select();

}






function retrieveLog(){
	// Retrieve the object from storage
	var lsReturned;
	lsReturned  = localStorage.getItem('timeLog');
	var bools = lsReturned === null;
	//alert('Retrieving ls timelog Empty? ' + bools );
	if (lsReturned === null){
        //local storage empty initialize time log 
		timeLog = timeLog;
		} else{
        // there is info in local storage - grab it    
		timeLog = JSON.parse(lsReturned);
	}
	//alert('timeLog.events.length = ' + timeLog.events.length);
	
}

function remove_from_local_storage(ls_name){
	localStorage.removeItem(ls_name);
}



function get_from_local_storage(ls_name){
	// Retrieve the object from storage
	// called from $(document).ready(function(){ clock.js
	var lsReturned;
	var strKey = 'strTask';

	//alert('in get_from_local_storage(ls_name)' + '\n' + 'ls_name = ' + ls_name);
	lsReturned  = localStorage.getItem(ls_name);
	if (lsReturned === null){
		//timeLog = timeLog;
		//alert('no obj found ' + ls_name);
		} else{
		// active item reload if needed
		//make improvements here	
		//timeLog = JSON.parse(lsReturned);
		//event = lsReturned;
		//alert('local storage = ' + localStorage.getItem('active'));
		restore_broken_event();
		//event.strTask = 'stuff value in';
		//show_event (event);
		//alert('obj found ' + ls_name + '\n' + Object.values(objTemp));
	}
	
	
}

function restore_broken_event(){
	var objTemp = {};
	objTemp = JSON.parse(localStorage.getItem('active'));
	broken_event = objTemp;
	restart();
	
}

function	restart(){
	events.push(event);
	events[0].strTask = broken_event.strTask;
	events[0].booActive = true;
    events[0].notes = broken_event.notes;
    events[0].startTime = broken_event.startTime;
    dateStartTime = events[0].startTime;
    $('#activity').html(events[0].strTask);
    OFF=false;
    setTimeout(displayObj, 1000);
    stop_start_enable();

}


function clear_ls(){
	//alert('in clear_ls function')
	localStorage.clear();
}

function start_timing () {
    //alert("set text");
  	//data-dismiss="modal"

  	};



$( "#selPrevAct" ).change(function() {
	$('#inputActivity').val($("#selPrevAct" ).val());
  	//alert( "Handler for .change() called." );
});

function addPrevAct(){
	//cycle through previous tasks
	//add to drop down
	retrieveLog();
	var size = timeLog.events.length ;
	var task;
	for(var i =0; i< size ; i++){
		task = timeLog.events[i].task;
		 if (addIt(task))
		 {
        	$('#selPrevAct').append($('<option/>',
 				{ 
        		value: task,
        		text : task
    			}));
    	
        };
		}
		$('#selPrevAct').sort_select_box();
}


function addIt(task){
	//check if task already in list
	//if not return true to addIt
	var booAddIt = true;
	$('#selPrevAct option').each(function(){
    if (this.value == task) {
    	console.log('Found it exit')
        booAddIt = false;
        return(false);
    	}
		});
	return booAddIt;
}

$.fn.sort_select_box = function(){
    // Get options from select box
    var my_options = $("#" + this.attr('id') + ' option');
    // sort alphabetically
    my_options.sort(function(a,b) {
        if ((a.text).toLowerCase() > (b.text).toLowerCase()) return 1;
        else if ((a.text).toLowerCase()< (b.text).toLowerCase()) return -1;
        else return 0
    })
   //replace with sorted my_options;
   $(this).empty().append( my_options );

   // clearing any selections
   $("#"+this.attr('id')+" option").attr('selected', false);
}