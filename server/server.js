var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var bikeData = require("./routes/bike-data")

var port = 3000;

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.use(express.static("public"));

app.use('/bike-data', bikeData);

app.listen(port, function() {
  console.log("Listening on port", port);
});
