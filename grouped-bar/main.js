//==============================================================================
// PARAMETERS
//==============================================================================

// margins, height, and width
const margin = { top: 20, right: 80, bottom: 30, left: 80 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// scales
const x = d3.scaleLinear().range([0, width]);
const y0 = d3.scaleBand().range([height, 0]).padding(0.5);
const y1 = d3.scaleBand().padding(0.25);

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//==============================================================================
// DRAW
//==============================================================================

d3.csv('data/data_tidy.csv').then(data => {

  data.forEach(d => {
    d.cost = +d.cost;
  })

  const nested = d3.nest()
    .keys(d => d.tower)
    .keys(d => d.sub_tower)
    .entries(data);


  const tower = nested[0].cost.map((d, i) => d.key);
  const subTower = nested[0].cost[0].cost.map((d, i) => d.key);

  x.domain([0, d3.max(data, d => d.value)]);
  y0.domain(tower).


    // log data
    console.log(data);

}).catch(error => {

  //
  console.log(error);
})
