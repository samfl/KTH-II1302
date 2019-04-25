var express = require('express');
var app = express();
//var http = require('http').Server(app);
//var ws = require("socket.io")(http);
var cfenv = require('cfenv');
require('./public/js/login.js')(app);
require('./public/js/page-routing.js')(app);
//var IoTApp  = require('./application/application.js');
var Client = require('ibmiotf').IotfApplication;

var iotCredentials;

//const IOT_PLATFORM = "iotex";
//OK
var app_env = cfenv.getAppEnv();

//Loop through configuration internally defined in Bluemix and retrieve the credential from the IoT service
//OK
var baseConfig = app_env.getServices('iotex');
iotCredentials = baseConfig['iotex'];

/* Serve the files out of ./public as our main files. */
//OK
app.use(express.static(__dirname + '/public'));

//OK
var iotAppConfig = {
 "org" : iotCredentials.credentials.org,
 "id" : iotCredentials.credentials.iotCredentialsIdentifier,
 "auth-method" : "apikey",
 "auth-key" : iotCredentials.credentials.apiKey,
 "auth-token" : iotCredentials.credentials.apiToken
}

//OK
var appClient = new Client(iotAppConfig);
appClient.connect();
console.log("Successfully connected to our IoT service!");


// subscribe to input events
// OK
appClient.on("connect", function () {
 console.log("subscribe to input events");
 appClient.subscribeToDeviceEvents("g10-pi");
});

//OK
var motionSensorData = {"motionPayload":{}};

// deviceType "raspberrypi" and eventType "motionSensor" are published by client.py on RaspberryPi
//FUNKAR EJ!
/*
appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload){
 if (eventType === 'motionSensor'){
   motionSensorData.motionPayload = JSON.parse(payload);
 }
}*/

//OK
app.listen(app_env.port, '0.0.0.0', function() {
});

/* Retrieve Cloud Foundry environment variables. */
//var credentials = app_env.getServiceCreds(IOT_PLATFORM);
//var application = new IoTApp(credentials.org, credentials.apiKey, credentials.apiToken);
