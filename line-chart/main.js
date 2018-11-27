/* bar chart */

// SET PARAMETERS //////////////////////////////////////////////////////////////

// define margins
const margin = { left: 100, right: 10, top: 10, bottom: 100 };

// define width and height
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// define canvas
const g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// x label
const xLabel = g
  .append('g')
  .attr('class', 'x-axis-label')
  .attr('x', width / 2)
  .attr('y', height + 140)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text("The World's Tallest Buildings");

// y label
const yLabel = g
  .append('g')
  .attr('class', 'y-axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Height (m)');

// DRAW ///////////////////////////////////////////////////////////////////////

d3.csv('data/walmart.csv')
  .then(data => {
    // clean data
    data.forEach(d => {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

    // log data to console
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
