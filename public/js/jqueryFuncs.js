$(document).ready(function(){
    $(".setAlarmLink").empty();
    loggedin();
    loadEvents();
    loadAlarms();
});

function login(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.post("/auth", {
        username: username,
        password: password
    }, function(response){
        $("#username").val('');
        $("#password").val('');
        if(response === false){
          alert('invalid username or password, try again!');
        }
        else{
            $("#logout").css("visibility","visible");
            $(".login").empty();
            window.location.href = '/index';
        }
       });
}


function logout(){
    $.post("/logout", function(response){
        if(response===false){
        $("#logout").css("visibility","hidden");
        $(".login").append('Login');
        }
    });
}
function loggedin(){
    $.post("/loggedin", function(response){
           if(response === true){
            $("#logout").css("visibility","visible");
            $('.setAlarmLink').append('Set Alarm');
            $(".login").empty();
           }
    });
}


function loadAlarms() {
   $.get("/getAlarms", function (alarms) {

       for (var i = 0; i < alarms.length; i++) {
           appendAlarm(alarms[i]);
       }
   });
}
function loadEvents() {
   $.get("/getEvents", function (events) {

       for (var i = 0; i < events.length; i++) {
           appendEvent(events[i]);
       }
   });
}
function appendEvent(event) {
   $("#events").append('event data:'+ '<p id="event">' + event + "</p>");
}
function appendAlarm(alarm) {
   $("#alarms").append('alarm data:'+ '<p id="alarm">' + alarm + "</p>");
}
