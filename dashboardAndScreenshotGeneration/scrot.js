const scrotConfig  = require('./scrotConfig.json');
const puppeteer = require('puppeteer');
const cp = require('child_process');

const IMAGE_FILE = '../imageProcessAndSend/dash.png';

// var cachebuster = Math.round(new Date().getTime() / 1000);

(async () => {
    // 1. Launch the browser
    const browser = await puppeteer.launch(scrotConfig);

    // Example scrotConfig.json
    // {    
    //     "dumpio": true,
    //     "defaultViewport": {
    //         "width": 480,
    //         "height": 800
    //     }
    // }

    // 2. Open a new page
    const page = await browser.newPage();

    // 3. Navigate to URL
    // await page.goto(`http://localhost:9999/?lat=${LAT}&lon=${LON}&openweather_key=${OPENWEATHER_KEY}&cb=` + cachebuster,
    await page.goto(`http://localhost:9999/`,
        {waitUntil: 'networkidle2'});

    // 4. Take screenshot
    await page.screenshot({path: IMAGE_FILE});

    await browser.close();

    // cp.execSync(`gm convert ${IMAGE_FILE} -colorspace GRAY ${IMAGE_FILE}`);
    cp.execSync(`gm convert ${IMAGE_FILE} -colorspace GRAY -rotate "-90" ${IMAGE_FILE}`);
})();
