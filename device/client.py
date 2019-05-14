#!/usr/bin/python
# This is only executed on the device client e.g. Raspberry Pi

import time
import os, json
import uuid
import motionSensor
import ibmiotf.device

motionSensorGPIOPort = 4

print("Try config")
options = ibmiotf.device.ParseConfigFile("/home/pi/device.cfg")
client = ibmiotf.device.Client(options)
print("Config ok!")

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

print "try to connect to IoT-platform"
client.connect()
print "connect to IBM Watson IoT platform successfully"

motionStatus = False
motionSensor.setup(motionSensorGPIOPort)

lastMotionSensor = 0
myList = [0,0]

while True:
  motionData = motionSensor.sample()
  jsonMotionData = json.dumps(motionData)
  motionStatus = motionData['motionDetected']
  lastMotionStatus = myList[0]
  myList.insert(0, motionStatus)
  myList.insert(0, lastMotionSensor)
  if (motionStatus == 1) and (myList[0] != myList[1]):
    client.publishEvent("status", "json", motionStatus)
    print "Change in motion detector status, motionDetected is now:", motionStatus

  time.sleep(1)
