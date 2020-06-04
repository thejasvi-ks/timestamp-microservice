// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/", function (req, res) {
  res.json({unix: Date.now(),utc:Date()});
});

app.get("/api/timestamp/:dateString", function (req, res) {
  
  let dateString = req.params.dateString;
  
  if(/\d{5,}/.test(dateString)){
    res.json({unix:parseInt(dateString),utc:new Date(parseInt(dateString)).toUTCString()});
  }
  
  let dateObject = new Date(dateString);
  res.json = dateObject.toString() === "Invalid Date" ? {error:"Invalid Date"} : { unix:dateObject.valueOf(),utc: dateObject.toUTCString()};
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});