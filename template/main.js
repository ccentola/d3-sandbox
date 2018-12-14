//==============================================================================
// HEADER
//==============================================================================

// title
const title = "Template"

// set title
document.title = title;

// add in document title
d3.select('body').append('h1').text(title);

//==============================================================================
// PARAMETERS
//==============================================================================

// margins, height, and width
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', 'lightgray')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//==============================================================================
// DRAW
//==============================================================================

// d3.csv('data/data_tidy.csv').then(data => {

//   // log data
//   console.log(data);

// }).catch(error => {

//   //
//   console.log(error);
// })
