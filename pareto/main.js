//==============================================================================
// PARAMETERS
//==============================================================================

//
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

//
const svg = d3.select('body').append('svg')
  .attr('class', 'chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', 'lightgray');

const g = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.right})`);

// scales
const x = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.20)
  .paddingOuter(0.20);

const yHist = d3.scaleLinear().range([height, 0]);
const yCum = d3.scaleLinear().range([height, 0]);


//==============================================================================
// DRAW
//==============================================================================

d3.csv('data/pareto_data.csv').then(data => {

  // // clean data
  // data.forEach(d => {
  //   d.amount = +d.amount;
  // })

  //typecast Amount to #, calculate total, and cumulative amounts
  let totalAmount = 0;
  for (let i = 0; i < data.length; i++) {
    data[i].amount = +data[i].amount;
    totalAmount += data[i].amount;
    if (i > 0) {
      data[i]['CumulativeAmount'] = data[i].amount + data[i - 1].CumulativeAmount;
    } else {
      data[i]['CumulativeAmount'] = data[i].amount;
    }
  }
  //now calculate cumulative % from the cumulative amounts & total, round %
  for (let i = 0; i < data.length; i++) {
    data[i]['CumulativePercentage'] = (data[i]['CumulativeAmount'] / totalAmount);
    data[i]['CumulativePercentage'] = parseFloat(data[i]['CumulativePercentage'].toFixed(2));
  }

  // set domains
  x.domain(data.map(d => d.category));
  yHist.domain([0, d3.max(data, d => d.amount)]);
  yCum.domain([0, 1]);

  // x axis
  g.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // yHist axis
  g.append('g')
    .attr('class', 'axis axis-y')
    .call(d3.axisLeft(yHist))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Amount ($)');

  // yCum axis
  g.append('g')
    .attr('class', 'axis axis-y')
    .attr('transform', `translate(${width},0)`)
    .call(d3.axisRight(yCum).ticks(10, '%'))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 4)
    .attr('dy', '-.71em')
    .style('text-anchor', 'end')
    .text('Cumulative ($)');

  const bar = g.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'bar');

  bar.append('rect')
    .attr('x', d => x(d.category))
    .attr('width', x.bandwidth())
    .attr('y', d => yHist(d.amount))
    .attr('height', d => height - yHist(d.amount));

  const guide = d3.line()
    .x(d => x(d.category))
    .y(d => yCum(d.CumulativePercentage));

  const line = g.append('path')
    .datum(data)
    .attr('d', guide)
    .attr('class', 'line');

  // log data
  console.log(data);

}).catch(error => {

  // log error
  console.log(error);

})