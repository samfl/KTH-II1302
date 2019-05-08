var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var passwordHash = require('password-hash');


module.exports = function(app,conn){





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
	
	var query = 'SELECT * from USERS WHERE USERNAME = ?';
	
	  conn.queryResult(query, [username], function (err, result) {
	
		var re = result.fetchSync();
	
		if(re === null){
			response.send(false);
		}
		else{
			var hashedPassword = re.PASSWORD;
	
			if(passwordHash.verify(password, hashedPassword)){
				request.session.loggedin = true;
				request.session.username = username;
				response.send(true);		
			}
			else{	
				response.send(false);
		   }
		}
		
	 });
 });


 app.post('/reg', function(request, response) {

	var username = request.body.username;
	var queryu = "SELECT * FROM USERS WHERE USERNAME = ?";
	
	 conn.queryResult(queryu, [username], function (err, result) {
		 if(result.fetchSync() !== null){
			 response.send(false);
			 response.end();
		 }
	 });
		
		var hashedPassword = passwordHash.generate(request.body.password);
		var queryin = "INSERT INTO USERS (USERNAME, PASSWORD) VALUES (?, ?)";
	
		conn.queryResult(queryin, [username,hashedPassword], function (err, result) {
	
			if(err) { console.log(err); }
			 else {
				response.end();
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


}
