import {weatherIdMappings} from "./weather.js";

const $ = (sel) => document.querySelector(sel);

const now = new Date();
const params = new URLSearchParams(location.search);
const LAT = params.get('lat');
const LON = params.get('lon');
const API_KEY = params.get('openweather_key');

const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
const dayOptions = {weekday: 'short'};
const timeOptions = {hour: '2-digit', minute: '2-digit', hour12: false};

const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions);
const timeFormat = new Intl.DateTimeFormat('en-US', timeOptions);
const dayFormat = new Intl.DateTimeFormat('en-US', dayOptions);

$('#day').innerText = dateFormat.format(now);
$('#lastupdated').innerText = timeFormat.format(now);

function weatherIconClass(time, weatherId) {
    const hrs = new Date(time).getHours();
    const isDay = hrs > 6 && hrs < 18;

    const dayNightName = `wi-owm-${isDay ? 'day' : 'night'}-${weatherId}`;
    let owmName = `wi-owm-${weatherId}`;
    let name = 'wi-na';

    if (weatherIdMappings.hasOwnProperty(owmName)) {
        name = owmName;
    }

    if (weatherIdMappings.hasOwnProperty(dayNightName)) {
        name = dayNightName;
    }

    return weatherIdMappings[name];
}

const loadWeather = async () => {
    // console.log( dateFormat.format(now) + " " + timeFormat.format(now) + " " + 'about to make the call')
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`);
    // THIS IS NOW PREPARED BY callAndCacheOpenweathermap.js
    const res = await fetch(`http://localhost:9999/weather.json`);
    const json = await res.json();
    // console.log(json)

    const resHumiTemp = await fetch('http://localhost:9999/humidityAndTemp.json');
    const jsonHumiTemp = await resHumiTemp.json();

    // console.log(jsonHumiTemp);

    const {sunrise, sunset, weather, dt} = json.current

    const sunriseMs = sunrise * 1000;
    const sunsetMs = sunset * 1000;

    const dayLength = sunsetMs - sunriseMs;
    const currentDay = now.getTime() - sunriseMs;
    const progress = currentDay / dayLength;
    const deg = (progress * 180) - 90;

    $('#lastupdated_weather').innerText = timeFormat.format(dt*1000);

    $('.sun__rotate').style.transform = `rotate(${deg}deg)`;

    $('.card .sunrise').innerText = timeFormat.format(new Date(sunriseMs));
    $('.card .sunset').innerText = timeFormat.format(new Date(sunsetMs));

    $('.card .temp').innerText = json.current.temp.toFixed(0);
    $('.card .temp-feels').innerText = json.current.feels_like.toFixed(0);
    $('.card .temp-actual').innerText = jsonHumiTemp.temp;

    // weather
    const [primary] = weather;
    if (primary) {
        $('.card .weather .name').innerText = primary.main;
        $('.card .weather .icon').classList.add(`wi-${weatherIconClass(dt, primary.id)}`);
    }

    // temperature
    const [day] = json.daily;
    if (day) {
        $('.temp-morn').innerText = day.temp.morn.toFixed(1);
        $('.temp-max').innerText = day.temp.day.toFixed(1);
        $('.temp-eve').innerText = day.temp.eve.toFixed(1);
    }

    // setup d3 graph
    const startFrom = json.hourly.findIndex(item => (item.dt * 1000) >= now.getTime())
    const hourly = json.hourly.slice(startFrom + 1 , startFrom + 10)
        .map(d => ({...d, dt: d.dt * 1000}));
    const margin = ({top: 20, right: 25, bottom: 100, left: 25});
    const height = 90;
    const width = 428;

    $('#hourly-weather').setAttribute('height', height);
    $('#hourly-weather').setAttribute('width', width);

    const svg = d3.select("#hourly-weather");

    // const line = d3.line()
    //     .defined(d => !isNaN(d.temp))
    //     .x(d => x(d.dt))
    //     .y(d => y(d.temp));
    // const y = d3.scaleLinear()
    //     .domain([0, d3.max(hourly, d => d.temp)]).nice()
    //     .range([height - margin.bottom, margin.top]);
    const x = d3.scaleTime()
        .domain(d3.extent(hourly, d => d.dt))
        .range([margin.left, width - margin.right])

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 75})`)
        .call(
            d3.axisBottom(x)
                .ticks(7)
                .tickSizeOuter(0)
                .tickFormat((d) => timeFormat.format(new Date(d))));

    const ticks = svg.append("g")
        .call(xAxis)
        .selectAll('.tick');

    ticks.append('text')
        .attr('fill', 'var(--l4)')
        .attr('y', -45)
        .text((d, i) => `${hourly[i].temp.toFixed(1)}°`)

    ticks.append('svg:foreignObject')
        .attr('width', 50)
        .attr('height', 50)
        .attr('y', -35)
        .attr('x', -50 / 2)
        .html((d, i) => {
            const {weather, dt} = hourly[i];
            const [primary] = weather;

            if (primary) {
                return `<i class="wi wi-${weatherIconClass(dt, primary.id)}"></i>`;
            }
        });


    // setup second d3 graph ----------------------------------------------------------------------------------------------------------------
    const daily = json.daily.slice(0,6)
        .map(d => ({...d, dt: d.dt * 1000}));
    // console.log('daily')

    $('#daily-weather').setAttribute('height', height);
    $('#daily-weather').setAttribute('width', width);

    const svgDaily = d3.select("#daily-weather");

    const xDaily = d3.scaleTime()
        .domain(d3.extent(daily, d => d.dt))
        .range([margin.left, width - margin.right])

    const xAxisDaily = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 75})`)
        .call(
            d3.axisBottom(xDaily)
                .ticks(5)
                .tickSizeOuter(0)
                .tickFormat((d) => dayFormat.format(new Date(d))));

    const ticksDaily = svgDaily.append("g")
        .call(xAxisDaily)
        .selectAll('.tick');

    ticksDaily.append('text')
        .attr('fill', 'var(--l4)')
        .attr('y', -45)
        .text((d, i) => `${daily[i].temp.day.toFixed(1)}°` )

    ticksDaily.append('svg:foreignObject')
        .attr('width', 50)
        .attr('height', 50)
        .attr('y', -35)
        .attr('x', -50 / 2)
        .html((d, i) => {
            const {weather, dt} = daily[i];
            const [primary] = weather;

            if (primary) {
                return `<i class="wi wi-${weatherIconClass(dt, primary.id)}"></i>`;
            }
        });

    // console.log("done")

    // line
    // svg.append("path")
    //     .datum(hourly)
    //     .attr("fill", "none")
    //     .attr("stroke", "#171717")
    //     .attr("stroke-width", 5)
    //     .attr("stroke-linejoin", "round")
    //     .attr("stroke-linecap", "round")
    //     .attr("d", line);
}

export default function setup() {
    loadWeather();
}
