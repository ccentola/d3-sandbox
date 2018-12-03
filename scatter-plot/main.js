// SET PARAMETERS //////////////////////////////////////////////////////////////
const svg = d3.select('svg').attr('width', 800).attr('height', 500);
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// grab svg 
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// set sacles
const x = d3.scaleLinear().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([height, 0]);
const color = d3.scaleOrdinal(d3.schemeSet1);

// initialize tooltip
const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function (d) {
    return `
      <strong>Sepal Length: </strong> <span style='color:red'> ${d.SepalLengthCm}</span><br>
      <strong>Sepal Width: </strong> <span style='color:red'> ${d.SepalWidthCm}</span>
    `;
  })

svg.call(tip);

// DRAW ///////////////////////////////////////////////////////////////////////
d3.csv('data/iris.csv').then(data => {

  // clean data
  data.forEach(d => {
    d.SepalLengthCm = +d.SepalLengthCm;
    d.SepalWidthCm = +d.SepalWidthCm;
    d.PetalLengthCm = +d.PetalLengthCm;
    d.PetalWidthCm = +d.PetalWidthCm;
  });

  // set x and y domains
  x.domain(d3.extent(data, d => { return d.SepalLengthCm; }));
  y.domain(d3.extent(data, d => { return d.SepalWidthCm; }));

  // add x axis
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .append('text')
    .attr('fill', '#000')
    .attr('class', 'label')
    .attr('x', width)
    .attr('y', -6)
    .attr('text-anchor', 'end')
    .text('Sepal Length (cm)');

  // add y axis
  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', `rotate(-90)`)
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Sepal Width (cm)');

  // add points
  g.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("cx", (d) => { return x(d.SepalLengthCm); })
    .attr("cy", (d) => { return y(d.SepalWidthCm); })
    .style("fill", (d) => { return color(d.Species); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  // log data
  console.log(data);
})
  .catch(error => {
    console.log(error);
  });


