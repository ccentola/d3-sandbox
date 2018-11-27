/* area chart */

// SET PARAMETERS //////////////////////////////////////////////////////////////

let tsvData = null;

const margin = { top: 20, right: 60, bottom: 30, left: 30 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// parse date
const parseDate = d3.timeParse('%Y');

// format
const formatSi = d3.format('.3s');
const formatNumber = d3.format('.1f');
const formatBillion = function(x) {
  return formatNumber(x / 1e9);
};

// set x, y, z
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const color = d3.scaleOrdinal(d3.schemeSet1);

// axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y).tickFormat(formatBillion);

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

// set stack
const stack = d3.stack();

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// DRAW ///////////////////////////////////////////////////////////////////////
d3.csv('data/data.csv')
  .then(data => {
    // clean data
    data.forEach(d => {
      d.date = parseDate(d.date);
    });

    // log data
    console.log(data);

    color.domain(
      d3.keys(data[0]).filter(key => {
        return key !== 'date';
      })
    );
    const keys = data.columns.filter(key => {
      return key !== 'date';
    });

    tsvData = (function() {
      return data;
    })();

    const maxDateVal = d3.max(data, function(d) {
      const vals = d3.keys(d).map(function(key) {
        return key !== 'date' ? d[key] : 0;
      });
      return d3.sum(vals);
    });

    // set domains for axes
    x.domain(
      d3.extent(data, d => {
        return d.date;
      })
    );
    y.domain([0, maxDateVal]);
    stack.keys(keys);

    stack.order(d3.stackOrderNone);
    stack.offset(d3.stackOffsetNone);

    console.log(stack(data));

    const browser = svg
      .selectAll('.browser')
      .data(stack(data))
      .enter()
      .append('g')
      .attr('class', d => {
        return `browser ${d.key}`;
      });

    browser
      .append('path')
      .attr('class', 'area')
      .attr('d', area)
      .style('fill', d => {
        return color(d.key);
      });

    browser
      .append('text')
      .data(d => {
        return d;
      })
      .attr('transform', d => {
        return `translate(${x(data[13].date)}, ${y(d[13][1])})`;
      })
      .attr('x', -6)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => {
        return d.key;
      })
      .attr('fill-opacity', 1);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    svg
      .append('text')
      .attr('x', 0 - margin.left)
      .text('Billions of Liters');
  })
  .catch(error => {
    console.log(error);
  });

// HELPER FUNCTIONS //////////////////////////////////////////////////////////
// function type(d, i, columns) {
//   // parse date
//   d.date = parseDate(d.date);

//   // convert numerical colums to percentage
//   for (let i = 1, n = columns.length; i < n; ++i)
//     d[columns[i]] = d[columns[i]] / 100;
//   return d;
// }
