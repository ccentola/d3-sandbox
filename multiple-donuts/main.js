//=============================================================================
// PARAMETERS
//=============================================================================

// select the svg element in your index.html file
// set the width and height attributes
// optionally, you can set the background property to visualize the chart area
// const svg = d3.select('svg').attr('width', 750).attr('height', 500);

// // set margins clockwise from top left to bottom right
// const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// // adjust the width and height of the svg element based on the given margins
// const width = +svg.attr('width') - margin.left - margin.right;
// const height = +svg.attr('height') - margin.top - margin.bottom;

// // define g as the chart origin
// const g = svg
//   .append('g')
//   .attr('transform', `translate(${margin.left},${margin.top})`);


const radius = 74;
const padding = 10;

// set custom color pallete
const color = d3.scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// arc
// determines the size of individual donuts: must be smaller than the radius
const arc = d3.arc()
  .outerRadius(radius - 30)
  .innerRadius(radius - 10);

const pie = d3.pie()
  .sort(null)
  .value(d => { return d.population; });



//=============================================================================
// DRAW
//=============================================================================
d3.csv('data/data.csv').then(data => {

  color.domain(d3.keys(data[0])
    .filter((key) => { return key !== "State"; }));

  data.forEach(d => {
    d.ages = color.domain().map((name) => {
      return { name: name, population: +d[name] };
    });
  });

  const legend = d3.select("body").append("svg")
    .attr("class", "legend")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .selectAll("g")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("transform", (d, i) => { return `translate(0,${i * 20})`; });

  legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(d => { return d; });

  const svg = d3.select("body").selectAll("pie")
    .data(data)
    .enter().append("svg")
    .attr("class", "pie")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .append("g")
    .attr("transform", `translate(${radius} , ${radius})`);

  svg.selectAll("arc")
    .data(d => { return pie(d.ages); })
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .style("fill", (d) => { return color(d.data.name); });

  svg.append("text")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) { return d.State; });

  // log data
  console.log(data);
})
  .catch(error => {
    // log error
    console.log(error);
  });

// const data = d3.range(1000).map(d3.randomBates(10));

// const formatCount = d3.format(",.0f");

// // x scale
// const x = d3.scaleLinear()
//   .rangeRound([0, width])

// // set bins
// const bins = d3.histogram()
//   .domain(x.domain())
//   .thresholds(x.ticks(20))(data);

// // y scale
// const y = d3.scaleLinear()
//   .domain([0, d3.max(bins, d => { return d.length; })])
//   .rangeRound([height, 0]);

// const bar = g.selectAll('rect')
//   .data(bins)
//   .enter()
//   .append('g')
//   .attr('class', 'bar')
//   .attr('transform', d => { return `translate(${x(d.x0)}, ${y(d.length)})`; });

// bar.append("rect")
//   .attr("x", 1)
//   .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
//   .attr("height", (d) => { return height - y(d.length); });

// bar.append("text")
//   .attr("dy", ".75em")
//   .attr("y", 6)
//   .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
//   .attr("text-anchor", "middle")
//   .text((d) => { return d.length; });

// g.append("g")
//   .attr("class", "axis axis-x")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(x));

