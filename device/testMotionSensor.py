#!/usr/bin/python
# It samples the dat afrom the motionsensor every half second

import motionSensor
import json
import time

gpioPort = 4
motionSensor.setup(gpioPort)

while True:
    time.sleep(0.05)
    try:
        motionData = motionSensor.sample()
        jsonData = json.dumps(motionData)
        print "Current motion sensor data:", jsonData
    except (Exception) as e:
            print "Uh no, exception!", e
            
