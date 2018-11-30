// margin
const margin = { top: 20, right: 0, bottom: 30, left: 40 }
const width = 600 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// add an svg element to the page
const svg = d3.select('body').append('svg')
  .attr('width', 500)
  .attr('height', 500)
  .style('background', 'lightgray');

// main call to data
d3.csv('data/cities.csv').then(data => {

  // type conversion
  data.forEach(d => {
    d.population = +d.population;
  });

  // do something
  dataViz(data);

  // log data
  console.log(data);

}).catch(error => {

  // log error
  console.log(error);

});

// function to create visualization
function dataViz(incomingData) {

  // find the max population
  const maxPopulation = d3.max(incomingData, d => d.population);

  const x = d3.scaleBand()
    .domain(incomingData.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  // set y scale
  const y = d3.scaleLinear()
    .domain([0, maxPopulation])
    .range([height - margin.bottom, margin.top]);

  d3.select('svg')
    .selectAll('rect')
    .data(incomingData)
    .enter()
    .append('rect')
    .attr('width', x.bandwidth())
    .attr('height', d => y(d.population))
    .attr('x', (d) => x(d.label))
    .attr('y', d => 480 - y(d.population))
    .style('fill', 'orange')
    .style('stroke', 'black')
    .style('stroke-width', '1-px');


}

//=============================================================================
// OLD 
//=============================================================================

// // example linear scale
// const newRamp = d3.scaleLinear().domain([1000, 10000]).range([0, 500]);

// // apply scale
// console.log(newRamp(1000)); // 0
// console.log(newRamp(10000)); // 500
// console.log(newRamp(5500)); // 250

// v4 convention
// d3.csv('data/cities.csv', (error, data) => { console.log(error, data); })

// v5 convention
// d3.csv('data/cities.csv').then((data) => {

//   // 2. clean data
//   data.forEach(d => {
//     // converts strings to numeric types for metrics
//     d.population = +d.population;
//     //d.population = parseInt(d.population); // can use parseInt as an alt
//     d.x = +d.x;
//     d.y = +d.y;
//   })

//   // 3. measure
//   // console.log(d3.min(data, d => d)); // return min by index...whoops
//   console.log(d3.min(data, d => d.population)); // min population
//   console.log(d3.max(data, d => d.population)); // max population
//   console.log(d3.mean(data, d => d.population)); // mean population

//   console.log(d3.extent(data, d => d.population)); // returns min and max

//   // 1. log data
//   console.log(data);

// }).catch(error => {
//   throw error;
// })

// find midpoint of ramp using a loop
// for (let i = 1000; i < 10000; i++) {
//   if (newRamp(i) === 250) {
//     console.log(i);
//   }
// }
