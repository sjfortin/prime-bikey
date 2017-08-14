$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/bike-data",
    success: function (response) {
      getBikeData(response);
      console.log(getBikeData(response));
      
    }
  });
});

function getBikeData(dataFromDB) {

  var bikeData = [];

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

  dataFromDB.forEach(function (trip) {
    var date = parseFloat(trip.date);
    var finalDate = new Date(date);
    var fullYear = finalDate.getFullYear();
    var monthName = month[finalDate.getMonth()];
    var day = finalDate.getDate();
    var time = finalDate.getHours() + ':' + finalDate.getMinutes();

    var distance = (trip.distance * 0.000621371192).toFixed(2);

    bikeData.push({
      month: monthName,
      day: day,
      year: fullYear,
      time: time,
      distance: distance
    });
  });

  return bikeData;
}

// function getDistanceChart(response) {
//   var ctx = $("#distanceChart");
//   var distanceChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: getEveningDates(response),
//       datasets: [
//         {
//           label: "Distance",
//           borderColor: "rgb(255,99,132)",
//           data: [1,2,3]
//         }
//       ]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }

// function getTimeChart() {
//   var ctx = $("#timeChart");
//   var timeChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: bikeData.dates,
//       datasets: [
//         {
//           label: "Time",
//           borderColor: "#666",
//           data: bikeData.time
//         }
//       ]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }

// function getTime(response) {
//   var time = response.map(function (trip) {
//     var minutes = Math.floor(trip.duration / 60000);
//     var seconds = parseFloat(((trip.duration % 60000) / 1000).toFixed(0));
//     return parseFloat((seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds));
//   });
//   return time;
// }
