const http = require('http');
var morgan = require('morgan');
var logger = morgan('combined');
var url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  logger(req, res, function (err) {

    var params = url.parse(req.url, true).query;
    const fs = require('fs');
    fs.writeFile('../dashboardAndScreenshotGeneration/battv.json', JSON.stringify(params), err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('OK');
    const exec = require('child_process').exec;
    var yourscript = exec('node scriptsToProcessImage.js',
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
          process.abort()
        }
      }
    )
    yourscript.stdout.pipe(process.stdout)
    yourscript.on('exit', function() {
      console.log('Child script has finished')
    })
  })
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

