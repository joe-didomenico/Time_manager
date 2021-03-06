//start here
'use strict'
var g_elapsedTime;
var g_strActivity;
var g_startTime;

//menu real time clock
//turned off
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    //    document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
};

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}



function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    console.log('endtime = ' + endtime);

    function updateClock() {
        var t = getTimeRemaining(endtime);
        var strTimeRemaining = ('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2);
        if (strTimeRemaining == '-1')
            strTimeRemaining = '0';
        $('#remaining').html(strTimeRemaining);
        $('title').html(strTimeRemaining);
        g_elapsedTime = Date.parse(new Date()) - Date.parse(g_startTime);
        //console.log('g_elapsedTime = '+ g_elapsedTime);
        if (t.total <= 0 || OFF === true) {
            clearInterval(timeinterval);

            if (OFF != true) {
                //play alarm
                audio.play();
            }

        }
    }
    g_startTime = new Date();
    //update clock to start
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
    //setInterval(updateClock, 1000);
}


var deadline;
var audio;

$(document).ready(function() {
    var arrayTL = [];
    //
    addPrevAct();
    nextObj();

    get_from_local_storage('active');
    //get audio clip loaded
    audio = $("#mysoundclip")[0];
    $('#textbox-results').val('Enter Results');
    $('#menu-settings').click(function() {
        $('#modal-settings').click();
        //collapse menu
        $("#navbar").collapse('hide');
    });
    //add code to open modal when menu clicked
    $('#menu-clear_ls').click(function() {
        $('#modal_clear_ls').modal('show');
    });
    //add code to open modal when menu clicked
    $('#btn_clear_ls').click(function() {
        clear_ls();
        $('#modal_clear_ls').modal('hide');
        //collapse menu
        $("#navbar").collapse('hide');
    });


    $('#saveOutput').click(function() {
        stuffIt2();
    });

    $('#showData').click(function() {
        displayLog();
    });

    $('#menu-sumlog').click(function() {
        summarizeLog();
    });


    $("#pause").click(function() {
        audio.pause();
        audio.currentTime = 0;
    });

    $("#play").click(function() {
        //alert("in play");
        $('#debug').html('in play');

        audio.play();

    });
    $('#myModal').on('shown.bs.modal', function(e) {

        var $input = $('#inputActivity'); // cache the variable
        //alert('in modal = ' + $input.val());
        //$input.removeAttr('disabled'); // enable it first, so it can get focus
        $input.focus(); // focus it
        $input.select();

    });

    $('#myRestore').on('shown.bs.modal', function(e) {

        var $input = $('#inputActivity'); // cache the variable
        //alert('in modal = ' + $input.val());
        //$input.removeAttr('disabled'); // enable it first, so it can get focus
        $input.focus(); // focus it
        $input.select();

    });



    $('#activity').click(function() {
        // this changes the activity description after the fact
        var str_activity = prompt("Update Activity", $('#activity').html());
        //check if cancel selected if so do nothing
        if (str_activity != null) {
            //if activity is empty set to blank
            if (str_activity == "") {
                str_activity = "blank";
            }
            $('#activity').html(str_activity);
            events[0].strTask = str_activity;
        }
    });

    $('#start_timing').click(function() {
        if ($('#inputActivity').val() != "Enter Activity") {
            $('#activity').html($('#inputActivity').val());
            //dismiss modal
            $("#myModal").modal('hide');
            $("#startElapsedCounter").click();
        } else {
            var strActivity = prompt("Enter Activity", "No Activity Entered");
            $('#activity').html(prompt(strActivity));
        }
    });

    //enable start button disable stop 
    if (!OFF)
        stop_start_enable();
    else
        start_stop_enable();

});

function start_stop_enable() {
    $('input#startElapsedCounter').removeProp('disabled');
    $('input#stopElapsedCounter').prop('disabled', 'disabled');
}

function stop_start_enable() {
    $('input#stopElapsedCounter').removeProp('disabled');
    $('input#startElapsedCounter').prop('disabled', 'disabled');
}

function setTimer() {
    OFF = false;
    var strActivity = $('#inputActivity').val();
    var lngMinutes = 60 * parseInt($('input[name="goalTime"]:checked').val());
    //lngMinutes = 10;
    deadline = new Date(Date.parse(new Date()) + lngMinutes * 1000);
    initializeClock('clockdiv', deadline);

    if (strActivity == "enter activity") {
        strActivity = prompt("Enter Activity", "No Activity Entered");
    }
    g_strActivity = strActivity;
    $('#activity').html(strActivity);

}

function pauseAlarm() {
    audio.pause();
    audio.currentTime = 0;
    events[0].alarm.booOn = false
    $('#bell-stat').html('OFF');
};
//added 3-6-2021
function copyTB() {
    const el = document.getElementById('textbox-log');
    el.select();
    document.execCommand('copy');
}