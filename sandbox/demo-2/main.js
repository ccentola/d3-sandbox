// example linear scale
const newRamp = d3.scaleLinear().domain([1000, 10000]).range([0, 500]);

// apply scale
console.log(newRamp(1000)); // 0
console.log(newRamp(10000)); // 500
console.log(newRamp(5500)); // 250

// v4 convention
// d3.csv('data/cities.csv', (error, data) => { console.log(error, data); })

// v5 convention
d3.csv('data/cities.csv').then((data) => {

  // 2. clean data
  data.forEach(d => {
    // converts strings to numeric types for metrics
    d.population = +d.population;
    //d.population = parseInt(d.population); // can use parseInt as an alt
    d.x = +d.x;
    d.y = +d.y;
  })

  // 3. measure
  // console.log(d3.min(data, d => d)); // return min by index...whoops
  console.log(d3.min(data, d => d.population)); // min population
  console.log(d3.max(data, d => d.population)); // max population
  console.log(d3.mean(data, d => d.population)); // mean population

  console.log(d3.extent(data, d => d.population)); // returns min and max

  // 1. log data
  console.log(data);

}).catch(error => {
  throw error;
})



// find midpoint of ramp using a loop
// for (let i = 1000; i < 10000; i++) {
//   if (newRamp(i) === 250) {
//     console.log(i);
//   }
// }
