// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date_string?", (req, res) => { // ? means optional param 
  const date_string = req.params.date_string; // get the date string from the url
  if (date_string) { // if there is a date string in the url
    const date = new Date(date_string); // create a date object from the date string
    if (new Date(parseInt(date_string)).getTime().toString() == date_string) { res.json({ unix: parseInt(date_string), utc: new Date(parseInt(date_string)).toUTCString() }) }
    else if (date.toString() === "Invalid Date") { // if the date object is invalid
      res.json({ error: "Invalid Date" }); // return an error
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() }); // return the unix and utc date
    }
  } else { // if there is no date string in the url
    res.json({ unix: Date.now(), utc: new Date().toUTCString() }); // return the current unix and utc date
  }
}
);


const port = process.env.PORT || 3000;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

