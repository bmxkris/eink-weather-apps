This is the code required to put on an E-Paper ESP32 Driver Board. This code is adapted from the original code provided by Waveshare: [https://www.waveshare.com/wiki/E-Paper_ESP32_Driver_Board#Resources]

The changes I have made are to have it send a GET request to an app [LINK TO imageprocessing and send app] on my network, which then sends image data to the board. The board then goes into deepsleep for an hour. I have a bug in my setup caused by Node-Canvas, which causes a segfault about 1 in 30 times, rather than fix this I just have the board go back to sleep for a short period of time and try again on wake. 

Yes my IP addresses and wait times are hard-coded, this was my first C++ project and it was challenging enough to make these small changes.