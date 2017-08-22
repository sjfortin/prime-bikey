// var bikeData = [];
var cleanData = [];

(function getBikeData(bikeData) {

    // Create month name array
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    bikeData.forEach(function (trip) {
        var date = parseFloat(trip.date);
        var finalDate = new Date(date);
        var fullYear = finalDate.getFullYear();
        var monthName = month[finalDate.getMonth()];
        var day = finalDate.getDate();
        var time = finalDate.getHours() + ':' + finalDate.getMinutes();

        var distance = (trip.distance * 0.000621371192).toFixed(2);

        cleanData.push({
            month: monthName,
            day: day,
            year: fullYear,
            time: time,
            distance: distance,
            duration: millisToMinutesAndSeconds(trip.duration)
        });
    });

    return cleanData;
})();