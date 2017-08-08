var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: ["7/24/17", "7/25/17", "7/26/17", "7/27/17", "7/28/17"],
    datasets: [
      {
        label: "Getting chart.js Up and Running",
        borderColor: "rgb(255, 99, 132)",
        data: [10, 45, 67, 23, 65]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
