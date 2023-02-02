import time
import network
import urequests
import dht
from machine import Pin
from machine import deepsleep
from wifideets import ssid, password, hostAndPort


led=Pin(2,Pin.OUT)
led.value(1)

def connect():
    sta_if = network.WLAN(network.STA_IF); sta_if.active(True)
    if not sta_if.isconnected():
        sta_if.connect(ssid,password)
        print("Waiting for connection...")
        while not sta_if.isconnected():
            time.sleep(0.5)
    print(sta_if.ifconfig())


connect()

sensor = dht.DHT11(Pin(13))
sensor.measure()
temp=sensor.temperature()
humi=sensor.humidity()

print('try catch')
try:
    response = urequests.get("http://" + hostAndPort + "/?temp=" + str(temp) + "&humi=" + str(humi))
except Exception as exc:
    print(exc)
    print('------ error sleepy time------')
    deepsleep(60000)

    
#print(response.text)
response.close()

led.value(0)

#sleep for 15min (900000 milliseconds)
print('sleepy time')
deepsleep(900000)
