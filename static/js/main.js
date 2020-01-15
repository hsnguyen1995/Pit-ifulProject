// ----------CONVERT JSON OBJECT INTO JS OBJECT-----------


// grab the python variable from the html
// JSON parse the object to convert to JS object
const avocado_json = document.getElementById('avoprice').getAttribute('value');
var avocado_js = JSON.parse(avocado_json);
// console.log(avocado_js); // Object check

// Filter out to obtain only conventional avocados
var conv = ["conventional"];
var filteredAvocado = avocado_js.filter(function(item) {
    return conv.indexOf(item.Type) > -1;
});

// console.log(filteredAvocado);

// Create empty arrays to store necessary values for upcoming plots
var avodate = [];
var avgprice = [];
var region = [];

// Iterate through avocado_js and push all the values into their respective arrays
filteredAvocado.forEach((data) => {
    Object.entries(data).forEach(([key, value]) => {
        if (key === "Date") {
            avodate.push(value);
        }
        else if (key === "AveragePrice") {
            avgprice.push(parseFloat(value));
        }
        else if (key === "Region") {
            region.push(value);
        }
    });
});

// Array check
// console.log(avgprice);

// Create empty array, iterate through type and region array to append unique values.
var listofRegions = [];
for (var i = 0; i < region.length; i++) {
    if (listofRegions.indexOf(region[i]) === -1 ) {
        listofRegions.push(region[i]);
    }
}

// Region check
// console.log(listofRegions);

// Create function to extract current region data
function getRegionData(chosenRegion) {
    dateData = [];
    priceData = [];
    for (var i = 0; i < region.length; i++) {
        if (region[i] === chosenRegion) {
            dateData.push(avodate[i]);
            priceData.push(avgprice[i]);
        }
    }
};

// ----------It's plotly time-----------

// Default plot is Cali Region and Conventional Type
setPlot('California');

// Create plot trace
function setPlot(chosenRegion) {
    getRegionData(chosenRegion);

    var trace1 = {
        type: "scatter",
        mode: "markers",
        name: 'Avg Price',
        x: dateData,
        y: priceData,
        line: {color: '#3da733'}
    };

    var data = [trace1];

    Plotly.newPlot('avoplot', data);
};

// query select html divs
var innerCon = document.querySelector('[data-num="0"');
var regionSel = innerCon.querySelector('.regiondata');

// create options list
function createOptions(textArr, selector) {
    for (var i = 0; i < textArr.length; i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArr[i];
        selector.appendChild(currentOption);
    }
};

createOptions(listofRegions, regionSel);

// Create function to update graph when region is changed
function regionUpdate(){
    setPlot(regionSel.value);
};

// add event listener for region change
regionSel.addEventListener('change', regionUpdate, false);




