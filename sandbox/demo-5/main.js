const margin = { top: 20, right: 50, bottom: 50, left: 100 };

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background', 'lightgray')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const color = d3.scaleOrdinal(d3.schemeSet1);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);


d3.csv('data/iris.csv').then(data => {

  // clean data
  data.forEach(d => {
    d.SepalLengthCm = +d.SepalLengthCm;
    d.SepalWidthCm = +d.SepalWidthCm;
    d.PetalLengthCm = +d.PetalLengthCm;
    d.PetalWidthCm = +d.PetalWidthCm;
  })

  //
  dataViz(data);

  // log data
  console.log(data);

}).catch(error => {
  console.log(error);
});

function dataViz(incomingData) {

  x.domain(d3.extent(incomingData, d => {
    return d.SepalLengthCm;
  }));

  y.domain(d3.extent(incomingData, d => {
    return d.SepalWidthCm;
  }));

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .attr('class', 'x axis')
    .call(xAxis);

  svg.append('g')
    .attr('transform', `translate(0,0)`)
    .attr('class', 'y axis')
    .call(yAxis);


  svg.append('text')
    .attr('x', 10)
    .attr('y', 10)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Sepal Width');

  svg.append('text')
    .attr('x', width)
    .attr('y', height - 10)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Sepal Length');

  svg.selectAll(".dot")
    .data(incomingData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("cx", (d) => { return x(d.SepalLengthCm); })
    .attr("cy", (d) => { return y(d.SepalWidthCm); })
    .style("fill", (d) => { return color(d.Species); })

}