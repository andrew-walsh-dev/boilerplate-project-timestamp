// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//my code below this line
app.use("/api/timestamp/", function(req, res) {
  let url = req.url.substring(1)

  res.json(getUnixAndUTC(url))
  
});

function getUnixAndUTC(url) {
    var unixTimestamp;
    if (url.includes('-')) {
      unixTimestamp = Date.parse(url);
    }
    else if (url === "") {
      unixTimestamp = Date.now();
    }
    else { 
      unixTimestamp = Number(url);
    }
    
    const milliseconds = unixTimestamp;
    const dateObject = new Date(milliseconds)
    const weekDay = dateObject.toLocaleString("en-US", {weekday: "short"})
    const monthDay = dateObject.toLocaleString("en-US", {day: "numeric"})
    const month = dateObject.toLocaleString("en-US", {month: "short"})
    const year = dateObject.toLocaleString("en-US", {year: "numeric"})
    const time = "00:00:00 GMT"

    return {
      "unix": unixTimestamp,
      "utc": weekDay + ", " + monthDay + " " + month + " " + year + " " + time
    }
}

