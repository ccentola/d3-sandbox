/* area chart */

// SET PARAMETERS //////////////////////////////////////////////////////////////
const svg = d3.select('svg');
const margin = { top: 50, right: 20, bottom: 30, left: 50 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// parse time
const parseDate = d3.timeParse('%Y %b %d');

// set x, y, z
const x = d3.scaleTime().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([height, 0]);
const z = d3.scaleOrdinal(d3.schemeSet1);

// set stack
const stack = d3.stack();

// set area
const area = d3
  .area()
  .x(d => {
    return x(d.data.date);
  })
  .y0(d => {
    return y(d[0]);
  })
  .y1(d => {
    return y(d[1]);
  });

// DRAW ///////////////////////////////////////////////////////////////////////
d3.tsv('data/data.tsv', type)
  .then(data => {
    const keys = data.columns.slice(1);

    x.domain(
      d3.extent(data, d => {
        return d.date;
      })
    );
    z.domain(keys);
    stack.keys(keys);

    console.log(data);
    console.log(stack(data));

    const layer = g
      .selectAll('.layer')
      .data(stack(data))
      .enter()
      .append('g')
      .attr('class', 'layer');

    layer
      .append('path')
      .attr('class', 'area')
      .style('fill', d => {
        return z(d.key);
      })
      .attr('d', area);

    // only label layers left at the end (if one browser disappers)
    layer
      .filter(d => {
        return d[d.length - 1][1] - d[d.length - 1][0] > 0.01;
      })
      .append('text')
      .attr('x', width - 6)
      .attr('y', d => {
        return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2);
      })
      .attr('dy', '.35em')
      .style('font', '10px sans-serif')
      .style('text-anchor', 'end')
      .text(d => {
        return d.key;
      });

    // x axis
    g.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // y axis
    g.append('g')
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(y).ticks(10, '%'));

    // g.append('path')
    //   .datum(data)
    //   .attr('fill', 'steelblue')
    //   .attr('d', area);

    // g.append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(x));

    // g.append('g')
    //   .call(d3.axisLeft(y))
    //   .append('text')
    //   .attr('fill', '#000')
    //   .attr('transform', `rotate(-90)`)
    //   .attr('y', 6)
    //   .attr('dy', '0.71em')
    //   .attr('text-anchor', 'end')
    //   .text('Price ($)');

    // // log data
    // console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// HELPER FUNCTIONS //////////////////////////////////////////////////////////
function type(d, i, columns) {
  // parse date
  d.date = parseDate(d.date);

  // convert numerical colums to percentage
  for (let i = 1, n = columns.length; i < n; ++i)
    d[columns[i]] = d[columns[i]] / 100;
  return d;
}
