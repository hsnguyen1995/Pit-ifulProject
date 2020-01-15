var svgWidth = 600;
var svgHeight = 400;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#kyPlot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "avg_profit_per_acre";

// function used for updating x-scale var upon click on axis label
function xScale(from71to19_js, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(from71to19_js, d => d[chosenXAxis]) ,
      d3.max(from71to19_js, d => d[chosenXAxis]) 
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "avg_profit_per_acre") {
    var label = "Avg. Profit per Acre";
  }
  else {
    var label = "Avg. Pounds per Acre";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.index}<br>${label} ${d[chosenXAxis]}`);
    });

  // circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
const from71to19=document.getElementById('yearlyData').getAttribute('value');
var from71to19_js=JSON.parse(from71to19);
console.log(from71to19_js);

  // parse data
  from71to19_js.forEach(function(data) {
	data.index=+data.index;
    data.year= +data.year;
    data.avg_profit_per_acre = +data.avg_profit_per_acre;
    data.avg_pounds_per_acre = +data.avg_pounds_per_acre;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(from71to19_js, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(from71to19_js, d => d.index)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(from71to19_js)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.index))
    .attr("r", 20)
    .attr("fill", "green")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var profitLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "avg_profit_per_acre") // value to grab for event listener
    .classed("active", true)
    .text("Avg Profit per Acre ($)");

  var poundsLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "avg_pounds_per_acre") // value to grab for event listener
    .classed("inactive", true)
    .text("Avg Pounds per Acre");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Index");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(from71to19_js, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "avg_pounds_per_acre") {
          poundsLabel
            .classed("active", true)
            .classed("inactive", false);
          profitLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          poundsLabel
            .classed("active", false)
            .classed("inactive", true);
          profitLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
// }).catch(function(error) {
//   console.log(error);

  
