//==============================================================================
// PARAMETERS
//==============================================================================

// margins, height, and width
const margin = { top: 20, right: 80, bottom: 30, left: 80 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// scales
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([height, 0]).padding(0.25);

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//==============================================================================
// DRAW
//==============================================================================

d3.json('data/data.json').then(data => {

  // sort values
  data.sort((a, b) => a.value - b.value);

  // set domains
  x.domain([0, d3.max(data, d => d.value)]);
  y.domain(data.map(d => d.area));

  // add x axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${width})`)
    .call(d3.axisBottom(x));

  // add y axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(y).tickSize(0));

  // init bars
  const bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')

  // add actual bars
  bars.append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('height', y.bandwidth())
    .attr('y', d => y(d.area))
    .attr('width', d => x(d.value));

  // add labels to bar ends
  bars.append('text')
    .attr('class', 'label')
    .attr('x', d => { return x(d.value) + 3; })
    .attr('y', d => { return y(d.area) + y.bandwidth() / 2 + 4; })
    .text(d => d.value);

  // log data
  console.log(data);

}).catch(error => {

  //
  console.log(error);
})
