const margin = { top: 20, right: 10, bottom: 20, left: 10 };

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left - margin.right)
  .attr('height', width + margin.top - margin.bottom)
  .style('background', 'lightgray')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const y = d3.scaleLinear()
  .range([height, 0]);


d3.csv('data/cities.csv').then(data => {

  // clean data
  dataViz(data);

  // log data
  console.log(data);

}).catch(error => {
  console.log(error);
});

function dataViz(incomingData) {
  const maxPopulation = d3.max(incomingData, d => parseInt(d.population));
  y.domain([0, maxPopulation]);

  svg.selectAll('rect')
    .data(incomingData)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', d => y(parseInt(d.population)))
    .attr('x', (d, i) => i * 60)
    .attr('y', d => 480 - y(parseInt(d.population)))
    .style('fill', 'red')
    .style('stroke', 'black')
    .style('stroke-width', '1px');

}