var express = require("express");
var router = express.Router();
var pool = require("../modules/pool"); //what goes here
var dates = require("../modules/dates");
var distance = require("../modules/distance");

var bikeData = {
    dates: dates,
    distance: distance
}

router.get("/", function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database:", errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connection to db is successful
            client.query("SELECT * FROM bikey;", function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log("Error making query", errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

module.exports = router;