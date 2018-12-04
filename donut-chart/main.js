// SET PARAMETERS //////////////////////////////////////////////////////////////
// const svg = d3.select('svg').attr('width', 800).attr('height', 500);
// const margin = { top: 20, right: 20, bottom: 30, left: 50 };
// const width = +svg.attr('width') - margin.left - margin.right;
// const height = +svg.attr('height') - margin.top - margin.bottom;

const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2;

// // grab svg 
// const g = svg
//   .append('g')
//   .attr('transform', `translate(${margin.left},${margin.top})`);

// // set sacles
// const x = d3.scaleLinear().rangeRound([0, width]);
// const y = d3.scaleLinear().rangeRound([height, 0]);
// const color = d3.scaleOrdinal(d3.schemeSet1);

// // initialize tooltip
// const tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function (d) {
//     return `
//       <strong>Sepal Length: </strong> <span style='color:red'> ${d.SepalLengthCm}</span><br>
//       <strong>Sepal Width: </strong> <span style='color:red'> ${d.SepalWidthCm}</span>
//     `;
//   })

// svg.call(tip);



const svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal(d3.schemeSet1);

const pie = d3
  .pie()
  .value(d => d.count)
  .sort(null);

const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius);

function type(d) {
  d.apples = Number(d.apples);
  d.oranges = Number(d.oranges);
  return d;
}

function arcTween(a) {
  const i = d3.interpolate(this._current, a);
  this._current = i(1);
  return t => arc(i(t));
}

d3.json('data/data.json', type).then(data => {
  d3.selectAll('input').on('change', update);

  function update(val = this.value) {
    // Join new data
    const path = svg.selectAll('path').data(pie(data[val]));

    // Update existing arcs
    path
      .transition()
      .duration(200)
      .attrTween('d', arcTween);

    // Enter new arcs
    path
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc)
      .attr('stroke', 'white')
      .attr('stroke-width', '2px')
      .each(function (d) {
        this._current = d;
      });
  }

  update('apples');
});
