require('dotenv').config();
const fs = require("fs")

const {
    LAT,
    LON,
    OPENWEATHER_KEY
} = process.env;

const assert = (test, text) => {
    if (!test) {
        throw `Assertion error: ${text}`;
    }
}

assert(LAT, 'environment variable `LAT` is set');
assert(LON, 'environment variable `LON` is set');
assert(OPENWEATHER_KEY, 'environment variable `OPENWEATHER_KEY` is set');

const callAndCacheOpenWeaterMap = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&units=metric&exclude=minutely,alerts&appid=${OPENWEATHER_KEY}`);
    // const res = await fetch(`http://localhost:9999/weather.json`);
    const json = await res.json();

    // console.log(json)

    if(json) {
        const data = JSON.stringify(json)
        fs.writeFile("weather.json", data, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
}

callAndCacheOpenWeaterMap()