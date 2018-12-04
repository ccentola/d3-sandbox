//=============================================================================
// PARAMETERS
//=============================================================================

// select the svg element in your index.html file
// set the width and height attributes
// optionally, you can set the background property to visualize the chart area
const svg = d3.select('svg').attr('width', 750).attr('height', 500);

// set margins clockwise from top left to bottom right
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// adjust the width and height of the svg element based on the given margins
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// define g as the chart origin
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// x scale
const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1); // adjusts the width between bars

// y scale
const y = d3.scaleLinear().rangeRound([height, 0]);

//=============================================================================
// DRAW
//=============================================================================
d3.tsv('data/letters.tsv').then(data => {
  // clean data
  data.forEach(d => { d.frequency = +d.frequency; });

  // set x and y domain
  x.domain(data.map(d => { return d.letter; }));
  y.domain([0, d3.max(data, d => { return d.frequency; })]);

  // x axis
  g.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // y axis
  g.append('g')
    .attr('class', 'axis axis-y')
    .call(d3.axisLeft(y).ticks(10, '%'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Frequency');

  // bars
  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) { return x(d.letter); })
    .attr('y', function (d) { return y(d.frequency); })
    .attr('width', x.bandwidth())
    .attr('height', function (d) { return height - y(d.frequency); });

  // log data
  console.log(data);
})
  .catch(error => {
    // log error
    console.log(error);
  });
