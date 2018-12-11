//==============================================================================
// PARAMETERS
//==============================================================================

// margins, height, and width
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 100 - margin.left - margin.right;
const height = 100 - margin.top - margin.bottom;

// scales
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', 'lightgray')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//==============================================================================
// DRAW
//==============================================================================

d3.csv('data/data_tidy.csv').then(data => {

  data.forEach(d => {
    d.cost = +d.cost;
  })

  svg.append('text')
    .attr('class', 'kpi')
    .attr('x', width / 2) // x is 1/2 width
    .attr('y', height / 2) // y is 1/2 height
    .style('text-anchor', 'middle')
    .style('font-size', height / 4) // set font size to 1/4 height (bad, i know)
    .text(d3.sum(data, d => d.cost));

  // log data
  console.log(data);

}).catch(error => {

  //
  console.log(error);
})
