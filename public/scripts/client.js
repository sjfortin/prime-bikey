var app = angular.module('BikeyApp', ['ngMaterial']).config(function ($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '900',
      'hue-1': '100',
      'hue-2': '500',
      'hue-3': 'A100'
    })
    .accentPalette('grey', {
      'default': '50'
    })
    .backgroundPalette('purple', {
      'default': '50'
    });

});

app.controller('BikeyController', ['$http', function ($http) {
  var self = this;

  self.getBikeData = function () {
    $http({
      method: 'GET',
      url: '/bike-data'
    }).then(function (response) {
      var cleanBikeData = formatBikeData(response.data);
      getDistanceChart(cleanBikeData);
      getTimeChart(cleanBikeData);
    });
  }

  self.getBikeData();

}]);

// Displays the distance chart
function getDistanceChart(data) {

  var ctx = document.getElementById("distanceChart").getContext('2d');

  var distanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(function (trip) {
        return trip.month + ' ' + trip.day + ', ' + trip.year;
      }),
      datasets: [
        {
          label: "Distance",
          borderColor: "rgb(255,99,132)",
          data: data.map(function (trip) {
            return trip.distance;
          })
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Displays the time chart
function getTimeChart(data) {
  console.log('Time chart bike data', data);
  
  var ctx = document.getElementById("timeChart").getContext('2d');

  var timeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(function (trip) {
        return trip.month;
      }),
      datasets: [
        {
          label: "Time",
          borderColor: "#666",
          data: data.map(function (trip) {
            return parseFloat(trip.duration);
          })
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Returns array of bike data objects
function formatBikeData(bikeData) {
  var formattedBikeData = [];

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

    formattedBikeData.push({
      month: monthName,
      day: day,
      year: fullYear,
      time: time,
      distance: distance,
      duration: millisToMinutesAndSeconds(trip.duration)
    });
  });
  console.log('this is the formatted data', formattedBikeData);

  return formattedBikeData;
};

// Converts time from millis to minutes and seconds
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

