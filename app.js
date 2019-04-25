var express = require('express');
var app = express();
//var http = require('http').Server(app);
//var ws = require("socket.io")(http);
var cfenv = require('cfenv');
require('./public/js/login.js')(app);
require('./public/js/page-routing.js')(app);
//var IoTApp  = require('./application/application.js');
var Client = require('ibmiotf').IotfApplication;

/* Serve the files out of ./public as our main files. */
app.use(express.static(__dirname + '/public'));


//const IOT_PLATFORM = "iotex";
var app_env = cfenv.getAppEnv();

app.listen(app_env.port, '0.0.0.0', function() {
});

/* Retrieve Cloud Foundry environment variables. */
//var credentials = app_env.getServiceCreds(IOT_PLATFORM);
//var application = new IoTApp(credentials.org, credentials.apiKey, credentials.apiToken);
