'use strict'
var objDisplayed;

function nextObj(forward){
	//get currently displayed index
	//move to next if < tasks.length
	var tlIndex = $('#liTask').data('index');
	if (tlIndex=='x'){
		tlIndex=0;
		}else{
			if(forward){
				tlIndex=tlIndex + 1;
			}else{
				tlIndex = tlIndex - 1;
			}
		} 
	
	if(tlIndex > -1 && tlIndex < timeLog.events.length ){
	$('#liTask').html(timeLog.events[tlIndex].task);
	$('#liTask').data('index' ,tlIndex);
	
	$('#lifDate').html(timeLog.events[tlIndex].fdate);
	$('#lifTime').html(timeLog.events[tlIndex].ftime);
  $('#liTime').html(timeLog.events[tlIndex].time);
	$('#liNotes').html(timeLog.events[tlIndex].notes);
	$('#liResults').html(timeLog.events[tlIndex].results);
}
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function outputEvent(strMsg , current){
	console.log('\noutputEvent start-------- ' + strMsg + '--------' );
		console.log('events[0].strTask = ' +  events[0].strTask );
	console.log('events[0].startTime = ' +  events[0].startTime );
	console.log('events[0].endTime = ' +  events[0].endTime );
	console.log('events[0].booActive = ' +  events[0].booActive  );
	console.log('events[0].alarm.period = ' +  events[0].alarm.period );
  console.log('outputEvent end -------- ' + strMsg + '--------\n\n' );
  

}

function stuffIt2(){
    OFF = true;
    //var i = 0;
    //var iPlus;
    //timeLog.events[0].task="code";
    //timeLog.events[0].fdate= new Date();
    //timeLog.events[0].ftime="60  min";
    //timeLog.events[0].notes="none";
    //i = timeLog.events.length;
    //console.log('timeLog.events.length=' + timeLog.events.length);
    //iPlus = i + 3;
    retrieveLog();
    //for( i  ; i < iPlus ; i++){
    
    
    //  objTemp.task= g_strActivity;
    //  objTemp.fdate=  new Date();
    //  objTemp.ftime= g_elapsedTime / 60000 ;
    //  objTemp.notes= "none";
//add logic to clear notes after saving

var finished = new Date();
var time24 = finished.toLocaleTimeString();
 //   time24 = time24.format('HH');
        timeLog.events.push(
            {   'task' : events[0].strTask,
                'fdate' : finished.toLocaleDateString(),
                'ftime' : time24,
                'time' : events[0].elapsedSeconds,
                'notes': document.getElementById('textbox-notes').value,
				'results': document.getElementById('textbox-results').value
            });

        
        ////console.log('timeLog.events.length=' + timeLog.events.length);
    saveLog();
  //  console.log("$('#textbox-notes').val()" + $('#textbox-notes').val());
	//clear notes field
    $('#textbox-notes').val('Enter Notes');
	//clear results field
    $('#textbox-results').val('Enter Results');
  //console.log("$('#textbox-notes').val()" + $('#textbox-notes').val());
    
    ////console.log("saved");
    retrieveLog();
    ////console.log("look at console output");

}

function new_date(){
  var temp_date = new Date();
  return temp_date.toISOString();;
}