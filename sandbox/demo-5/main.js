// SET PARAMETERS //////////////////////////////////////////////////////////////
const svg = d3.select('svg').attr('width', 800).attr('height', 500);
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// grab svg 
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// set sacles
const x = d3.scaleLinear().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([height, 0]);
const color = d3.scaleOrdinal(d3.schemeSet1);

// // initialize tooltip
// const tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function (d) {
//     return `
//       <strong>Sepal Length: </strong> <span style='color:red'> ${d.SepalLengthCm}</span><br>
//       <strong>Sepal Width: </strong> <span style='color:red'> ${d.SepalWidthCm}</span>
//     `;
//   })

// svg.call(tip);

// DRAW ///////////////////////////////////////////////////////////////////////
d3.csv('data/world_cup.csv').then(data => {

  overallTeamViz(data);

  // log data
  console.log(data);
})
  .catch(error => {
    console.log(error);
  });


function overallTeamViz(incomingData) {
  d3.select("svg")
    .append("g")
    .attr("id", "teamsG")
    .attr("transform", "translate(50,300)")
    .selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("class", "overallG")
    .attr("transform", (d, i) => `translate(${(i * 50)}, 0)`);

  var teamG = d3.selectAll("g.overallG");

  teamG
    .append("circle")
    .attr("r", 20);

  teamG
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", 30)
    .text(d => d.team);

  var dataKeys = Object.keys(incomingData[0])
    .filter(d => d !== "team" && d !== "region");

  d3.select("#controls").selectAll("button.teams")
    .data(dataKeys).enter()
    .append("button")
    .on("click", buttonClick)
    .html(d => d);

  function buttonClick(datapoint) {
    var maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
    var radiusScale = d3.scaleLinear()
      .domain([0, maxValue]).range([2, 20]);
    d3.selectAll("g.overallG").select("circle")
      .attr("r", d => radiusScale(d[datapoint]));
  }
}
