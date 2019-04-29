var ibmdb = require('ibm_db');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app){

ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net;UID=ldk15513;PWD=hqsv1nbr3^7tdzg1;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
    if (err) return console.log(err);




app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/auth', function(request, response) {

var username = request.body.username;
var password = request.body.password;

var query = 'select * from USERS WHERE USERNAME = ? AND PASSWORD = ?';

conn.queryResult(query, [username,password], function (err, result) {

	var re = result.fetchSync();

	 if(err) { console.log(err); }
		else{
			if(re===null){
				response.send(false);
			}
			else{	
	     		request.session.loggedin = true;
				response.send(true);
			}
    }
 });
});


app.post('/reg', function(request, response) {

	var username = request.body.username;
	var password = request.body.password;

	var queryin = "INSERT INTO USERS (USERNAME, PASSWORD) VALUES (?, ?)";

	conn.queryResult(queryin, [username,password], function (err, result) {

		if(err) { console.log(err); }
		 else {
			response.redirect('/login');
		 }
	});
});



app.get('/registration', function(request, response) {

	response.sendFile(path.join(__dirname + '/../registration.html'));

});

app.get('/login', function(request, response) {

	response.sendFile(path.join(__dirname + '/../login.html'));

});

app.post('/logout', function(request, response) {
	  
	request.session.loggedin = false;
	response.send(request.session.loggedin);
	
});

app.post('/loggedin', function(request, response) {

   response.send(request.session.loggedin);
   
});

});

}
