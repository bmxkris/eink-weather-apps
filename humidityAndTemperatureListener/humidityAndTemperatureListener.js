const http = require('http');
var morgan = require('morgan');
var logger = morgan('combined');
var url = require('url');

const PORT = 3030;

const server = http.createServer((req, res) => {
  logger(req, res, function (err) {
    
    var params = url.parse(req.url, true).query;
    // console.log(JSON.stringify(params));
    
    const fs = require('fs');
    fs.writeFile('../dashboardAndScreenshotGeneration/humidityAndTemp.json', JSON.stringify(params), err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('OK');    
  })
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});