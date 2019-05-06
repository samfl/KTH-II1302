var ibmdb = require('ibm_db');

module.exports = function(app){

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





});

}