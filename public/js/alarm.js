module.exports = function(app, application, conn) {

app.post('/seta', function(request, response) {
  if(!request.body) {
    console.log("Object missing!");
  } else {
    var start = request.body.start;
    var end = request.body.end;
    var user = request.session.username;
    var desc = request.body.desc;

    var queryin = "INSERT INTO ALARMS (START, END, USERNAME, DESCRIPTION) VALUES (?, ?, ?, ?)";

    conn.queryResult(queryin, [start,end,user,desc], function (err, result) {
      if(err) {console.log(err);}
      else {response.redirect('/index');}
    });
  }
});


application.on('payload', function(data) {

  if(data == 1) {
    var date = new Date();
    var currentHour = String(date.getHours()).padStart(2, "0");
    var currentMin = String(date.getMinutes()).padStart(2, "0");
    var currentSec = String(date.getSeconds()).padStart(2, "0");
    var currentTime = currentHour + ":" + currentMin;
    var query = 'SELECT * from ALARMS WHERE START < CAST(? as time) AND END > CAST(? as time)'

    conn.queryResult(query, [currentTime,currentTime], function (err, result) {
        var re = result.fetchSync();
         if(err) { console.log(err); }
            else {
              if(re===null){console.log('not found');}
              else {
                console.log('exist');
                currentTime = currentTime + ':' + currentSec;
                var currentDate = date.toISOString().slice(0,10);
                var queryin = "INSERT INTO EVENTS (EVENTTIME,EVENTDATE) VALUES (?, ?)";
	               conn.queryResult(queryin, [currentTime,currentDate], function (err, result) {
	           	      if(err) {console.log(err);}
                 });
              }
            }
        });
      }
    });


    app.get('/getAlarms', function(request, response) {
       var username = request.session.username;
       var querya = 'SELECT * from ALARMS WHERE USERNAME = ?';

       conn.queryResult(querya,[username], function (err, result) {
         if(result === null) {response.end()} else {
           var arrayresult = result.fetchAllSync({fetchMode:3});
           if(arrayresult === null) { response.end()} else {
             response.send(arrayresult);
           }
         }
       });
     });


     app.get('/getEvents', function(request, response) {
       var querye = 'SELECT * from EVENTS';

       conn.queryResult(querye, function (err, result) {
       var arrayresult = result.fetchAllSync({fetchMode:3});
         response.send(arrayresult);
       });
     });


     app.get('/setalarm', function(request, response) {
	      response.sendFile(path.join(__dirname + '/../setAlarm.html'));
      });
}
