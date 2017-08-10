var bikeData = {};

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/bike-data",
    success: function (response) {
      bikeData.dates = getDates(response);
      bikeData.distance = getDistance(response);
      console.log(bikeData.dates);
      getChart();
    }
  });
});

function getChart() {
  var ctx = $("#myChart");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bikeData.dates, //An array of dates
      datasets: [
        {
          label: "Chart.js Boi",
          borderColor: "rgb(255,99,132)",
          data: bikeData.distance // An array of the times
        }
      ]
    },

    options: {}
  });
}

function getDates(response) {
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

  var formattedDates = response.map(function (trip) {
    var date = parseFloat(trip.date);
    var finalDate = new Date(date);
    var fullYear = finalDate.getFullYear();
    var monthName = month[finalDate.getMonth()];
    var day = finalDate.getDate();
    var time = finalDate.getHours() + ':' + finalDate.getMinutes();
    return monthName + " " + day + ", " + fullYear + ' @ ' + time;
  });

  return formattedDates;
}

function getDistance(response) {

  var miles = response.map(function (trip) {
    var meters = trip.distance;
    return (meters * 0.000621371192).toFixed(2);
  });
  return miles;
}
