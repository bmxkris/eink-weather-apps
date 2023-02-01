Most of the code for this part of the project was forked from:
https://github.com/makepanic/eink-weather

A small html snippet that allows the generation of a weather dashboard for display on an e-ink displace.

## A small set of application to manage my home weather dashboard

* This project contains the following directories:
    * dashboardAndScreenshotGeneration
    * esp32-eink-fetch-and-display-image
    * esp32-measure-humidity-and-temperature-and-send-to-listener
    * humidityAndTemperatureListener
    * imageProcessAndSend

### dashboardAndScreenshotGeneration
Fetches weather data from OpenWeatherMap and stores the result as a JSON file. This is called by cron every N minutes
Another cron job calls scrot.js, which takes a screenshot of an HTML page that uses this JSON data to create a dashboard. The resulting image is stored in the `imageProcessAndSend` directory

### humidityAndTemperatureListener
A small node app that listens for the call from `esp32-measure-humidity-and-temperature-and-send-to-listener` and saves the data to a file in the directory for `dashboardAndScreenshotGeneration`

### imageProcessAndSend
A small node app that listens for a call from `esp32-eink-fetch-and-display-image` and runs a script that processes and sends the `dash.png` created by `dashboardAndScreenshotGeneration`

### esp32-eink-fetch-and-display-image
C++ code mostly taken straight from Waveshare, this code has been edited to make a call to the server hosting the `imageProcessAndSend` app, and then go into deepsleep once the image has been sent

### esp32-measure-humidity-and-temperature-and-send-to-listener
Micropython code to take humidity and temperature readings and send them to the listener app `humidityAndTemperatureListener`