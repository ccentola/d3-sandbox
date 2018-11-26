/* Line Chart */

// PARAMETERS //////////////////////////////////////////////////////////////////

// margins
const margin = { left: 40, right: 30, top: 40, bottom: 30 };

// width and height
const width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

/* SCALES */

// x scale
const x = d3
  .scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([margin.left, width - margin.right]);

// y scale
const y = d3
  .scaleLinear()
  .domain([0, d3.max(data => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

/* AXES */

// x axis
const xAxis = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
  );

// y axis
const yAxis = g =>
  g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select('.domain').remove())
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y)
    );

// DRAW VIZ ////////////////////////////////////////////////////////////////////

// data
d3.csv('data/walmart.csv')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// HELPER FUNCTIONS ////////////////////////////////////////////////////////////
