#!usr/bin/python
# Define setup() that initializes GPIO, and samples() that samples data
# To test the hardware of a PIR-sensor

import RPi.GPIO as GPIO

gpioPort = 0

def setup(inputPort):
    global gpioPort
    gpioPort = inputPort
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(gpioPort, GPIO.IN, GPIO.PUD_DOWN)

def sample():
    global gpioPort
    data = {}
    currentState = GPIO.input(gpioPort)
    data['motionDetected'] = currentState
    return data

