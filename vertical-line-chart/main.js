//==============================================================================
// PARAMETERS
//==============================================================================

//
const margin = { top: 20, right: 60, bottom: 30, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

//
const svg = d3.select('body').append('svg')
  .attr('class', 'chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.right})`);

//
const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

//
const parseTime = d3.timeParse('%Y');
const bisectDate = d3.bisector(d => d.year).left;

//
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleTime().range([height, 0]);

//
const line = d3.line()
  .x(d => x(d.value))
  .y(d => y(d.year))
  .curve(d3.curveStepAfter);



//==============================================================================
// DRAW
//==============================================================================

d3.json('data/data.json').then(data => {

  // clean data
  data.forEach(d => {
    d.year = parseTime(d.year);
    d.value = +d.value;
  })

  // set x and y domains
  y.domain(d3.extent(data, function (d) { return d.year; }).reverse());
  x.domain([d3.min(data, function (d) { return d.value; }), d3.max(data, function (d) { return d.value; }) * 1.005]);

  //x axis
  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // y axis
  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .attr('fill', '#5d6971')
    .text('Running Sum');

  // line
  g.append('line')
    .attr('class', 'zero')
    .attr('stroke-dasharray', '5,5')
    .attr('x1', x(0))
    .attr('y1', 0)
    .attr('x2', x(0))
    .attr('y2', height)
    .attr('transform', 'translate(30,0)');

  //
  g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('transform', 'translate(30,0)')
    .attr('d', line);

  g.append("g")
    .attr("class", "rects")
    .selectAll("text")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.value); })
    .attr("y", function (d) { return y(d.year); })
    .attr("width", 35)
    .attr("height", 20)
    .attr("transform", "translate(15,-15)")
    .style("fill", "#fff");

  g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", function (d) { return x(d.value); })
    .attr("y", function (d) { return y(d.year); })
    .attr("text-anchor", "middle")
    .attr("transform", "translate(30,0)")
    .text(function (d) {
      return d.value + "m";
    });

  // log data
  console.log(data);

}).catch(error => {

  // log error
  console.log(error);

})