var ibmdb = require('ibm_db');

module.exports = function(app,application){

ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net;UID=ldk15513;PWD=hqsv1nbr3^7tdzg1;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
 if (err) return console.log(err);

 app.post('/setAlarm', function(request, response) {

    var start = request.body.start;
    var end = request.body.end;
    var user = request.session.username;
    var desc = request.body.desc;

	var queryin = "INSERT INTO ALARMS (START, END, USER, DESCRIPTION) VALUES (?, ?, ?, ?)";

	conn.queryResult(queryin, [start,end,user,desc], function (err, result) {
		if(err) {
            console.log(err);
        }
		 else {
			response.redirect('/index');
		 }
	});
});

application.on('payload', function(data) {

//function checkForAlarm() {
  if(data === 1){
    var date = new Date();
    var currentHour = String(date.getHours()).padStart(2, "0");
    var currentMin = String(date.getMinutes()).padStart(2, "0");
    var currentSec = String(date.getSeconds()).padStart(2, "0");
    var currentTime = currentHour + ":" + currentMin;

    var query = 'SELECT * from ALARMS WHERE START < CAST(? as time) AND END > CAST(? as time)'
    conn.queryResult(query, [currentTime,currentTime], function (err, result) {

        var re = result.fetchSync();

         if(err) { console.log(err); }
            else{
                if(re===null){
                console.log('not found');
                }
                else{
                console.log('exist');
                currentTime = currentTime + ':' + currentSec;
                var currentDate = date.toISOString().slice(0,10);

                var queryin = "INSERT INTO EVENTS (EVENTTIME,EVENTDATE) VALUES (?, ?)";

	            conn.queryResult(queryin, [currentTime,currentDate], function (err, result) {
	           	if(err) {
                         console.log(err);
              }
	            });

              }
          }
        });
      }
    });

    //setInterval(checkForAlarm, 10000);
    app.get('/getAlarms', function(request, response) {
       var querya = 'SELECT * from ALARMS';

       conn.queryResult(querya, function (err, result) {
           var arrayresult = result.fetchAllSync({fetchMode:3});
           response.send(arrayresult);
       });
     });

     app.get('/getEvents', function(request, response) {
       var querye = 'SELECT * from EVENTS';

       conn.queryResult(querye, function (err, result) {
       var arrayresult = result.fetchAllSync({fetchMode:3});
         response.send(arrayresult);
       });
     });
   });
}
