$(document).ready(function(){
    $(".setAlarmLink").empty();
    $(".viewAlarmsLink").empty();
    $(".viewEventsLink").empty();
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

function register(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.post("/reg", {
        username: username,
        password: password
    }, function(response){
        $("#username").val('');
        $("#password").val('');
        if(response === false){
          alert('user with that username already exists');
        }
        else{
            window.location.href = 'login.html';
        }
       });
}

function logout(){
    $.post("/logout", function(response){
        if(response===false){
        $("#logout").css("visibility","hidden");
        $(".login").append('Login');
        $(".viewEventsLink").empty();
        $(".viewAlarmsLink").empty();
        $(".setAlarmLink").empty();
        }
    });
}
function loggedin(){
    $.post("/loggedin", function(response){
           if(response === true){
            $("#logout").css("visibility","visible");
            $('.setAlarmLink').append('Set Alarm');
            $('.viewAlarmsLink').append('View Alarms');
            $('.viewEventsLink').append('View Events');
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
var cunnter = 1;
function appendEvent(eventt) {
   var e = eventt;
   $("#events").append('<tr>' +
                         "<td>" + "Example Data.. " + cunnter + "</td>" +
                         "<td>" + e[1] + "</td>" +
                         "<td>" + e[0] + "</td>" +
                       '</tr>');
   cunnter++;
}
function appendAlarm(alarm) {
   $("#alarms").append('alarm data:'+ '<p id="alarm">' + alarm + "</p>");
}

function eventSearch() {
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#events tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}
