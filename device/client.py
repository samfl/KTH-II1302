#!/usr/bin/python
# This is only executed on the device client e.g. Raspberry Pi

import time
import os, json
import uuid
import motionSensor
import ibmiotf.device

motionSensorGPIOPort = 4

print("Hej")
options = ibmiotf.device.ParseConfigFile("/home/pi/device.cfg")
client = ibmiotf.device.Client(options)
print("Fel")

# try:
#  options = {
#    "org": etz9jx,
#    "type": g10-pi,
#    "id": 0,
#    "auth-method": token,
#    "auth-token": jadijada,
#    "clean-session": true
#  }
#  client = ibmiotf.device.Client(options)
#except ibmiotf.ConnectionException  as e:

print "try to connect to IoT"
client.connect()
print "connect to IoT successfully"

motionStatus = False
motionSensor.setup(motionSensorGPIOPort)


while True:
  motionData = motionSensor.sample()
  jsonMotionData = json.dumps(motionData)
  motionStatus = motionData['motionDetected']
  #client.publishEvent("raspberrypi", options["id"], "motionSensor", "json", jsonMotionData)
  client.publishEvent("status", "json", motionStatus)

  if motionData['motionDetected'] != motionStatus:
    motionStatus = motionData['motionDetected']
    print "Change in motion detector status, motionDetected is now:", motionStatus

  time.sleep(1)
