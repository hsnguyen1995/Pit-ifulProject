const week2019=document.getElementById('weeklyData').getAttribute('value');
var week2019_js=JSON.parse(week2019);
console.log(week2019_js);

var week = [];
var hist = [];
var projection = [];
var harvest = [];

// Iterate through avocado_js and push all the values into their respective arrays
week2019_js.forEach((data) => {
    Object.entries(data).forEach(([key, value]) => {
        if (key === "week") {
            week.push(value);
        }
        else if (key === "historical4yearforecast") {
          hist.push(parseInt(value));
        }
        else if (key === "amricprojection") {
          projection.push(parseInt(value));
        }
        else if (key === "amricactualharvest") {
          harvest.push(parseInt(value));
      }
    });
});

const dataDisplay = {
  chart: {
    caption: "Weekly Projections v. Harvest",
    yaxisname: "Volume in Pounds",
    subcaption: "2019",
    showhovereffect: "1",
    numbersuffix: "%",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> lbs of avocadoes were $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [
       labels= harvest
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Historical 4 Year Forecast",
      data: [
        values= hist
      ]
    },
    {
      seriesname: "AMRIC Projection",
      data: [
        values= projection
      ]
    },
    {
      seriesname: "Actual Harvest",
      data: [
        values= harvest
      ]
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "msline",
    renderAt: ".amyPlot",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataDisplay
  }).render();
});


