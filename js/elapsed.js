'use strict'
// record start time
var dateStartTime;


function display() {
    alert('in display function');
    // later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - dateStartTime;

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);
    //console.log('seconds ' + seconds);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff);

 

    // the rest of timeDiff is number of days

    seconds = checkTime(seconds);
    minutes = checkTime(minutes);
    hours = checkTime(hours);

    $("#elapsedTime").text( hours + ":" + minutes + ":" + seconds);
    setTimeout(display, 1000);
}

$("input#startElapsedCounter").click(function () {
    if(OFF === false){
        //alert('Stopping current activity');
    }else{
    OFF = false;

    //console.log('events[0] = ' + events[0]);
    
    //this defines the array
    events.push(event);
    //
   // console.log('events[0] = ' + events[0]);
    //disable start button
    //enable stop button
    stop_start_enable(); 

    events[0].strTask = getTask();
    events[0].booActive = true;
    events[0].notes = 'events[0]';
    
    events[0].startTime = new Date();

     console.log('events[0].startTime = ' + events[0].startTime );
     //set alarm
    events[0].alarm.period = 60 * parseInt($('input[name="goalTime"]:checked').val());
    events[0].alarm.startTime = events[0].startTime;
    events[0].alarm.booOn = (events[0].alarm.period != '0');
    //events[0].alarm.period = 5;
    

    if (events[0].alarm.booOn){
        $('#bell-stat').html(' ON' + '<span id="remain" ></span>');}else{ 
        $('#bell-stat').html(' OFF');
    }
    //send events object 0 to consol
    outputEvent('start elapsed' , events[0]);
    //save new event data
    //this is where the active item is saved
    //alert('about to store current item');
    save_to_local_storage('active' , events[0]);
    //debug get item from ls
    //worked
    //alert(localStorage.getItem('active'));
    

    setTimeout(displayObj, 1000);
    }
});

function toggleBell(){
 //  alert("turning alarm off")
   pauseAlarm();
  
}


$("input#stopElapsedCounter").click(function () {

    //events[0] = new Object(event);
    //events[0].strTask = new Date();
    
    events[0].endTime = new Date();
    outputEvent('after adding end time' , events[0]);
    events[0].elapsedSeconds  = Math.round((events[0].endTime - new Date(events[0].startTime))/1000 ); /// 1000);
    console.log('events[0].elapsedSeconds = ' + events[0].elapsedSeconds);
    events[0].booActive = false;
    start_stop_enable();
    remove_from_local_storage('active');
	set_results();
    stuffIt2();
});





function getTask(){
    var strActivity = $('#inputActivity').val(); 
      if (strActivity == "enter activity") {
           strActivity = prompt("Enter Activity", "No Activity Entered");
        }
      g_strActivity = strActivity;  
      $('#activity').html(strActivity);
      return strActivity; 
}

function displayObj() {
    // later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - new Date(events[0].startTime);
    //alert('endtime = ' + endTime + '  startTime = ' + events[0].startTime);
    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);
    //console.log('seconds ' + seconds);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff);

 

    // the rest of timeDiff is number of days

    seconds = checkTime(seconds);
    minutes = checkTime(minutes);
    hours = checkTime(hours);

    $("#elapsedTime").text( hours + ":" + minutes + ":" + seconds);
    //check if alarm on
    if(events[0].alarm.booOn){
        //check if time to alarm
        var t;
        var left;

        t = Math.round((Date.parse(new Date()) - events[0].startTime) / 1000);
       left = events[0].alarm.period - t ;
        if (left > 60 ){
            left = Math.round((left/60) - .5);

        }
        if(left<0)
            left='0';

        $('span#remain').html(' [ ' + left + ' ] ');
        //console.log('-events[0].alarm.period --' + events[0].alarm.period );

        if (t > events[0].alarm.period ) {
            console.log('t.total > period ');
    
        if(OFF!= true){
            events[0].alarm.booOn=false;
            //play alarm
			 $('#debug').html('in timeout play');
            $('#play').click();
            }

        }
    
}
if(!OFF){
        setTimeout(displayObj, 1000);
    }
}

