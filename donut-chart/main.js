// // SET PARAMETERS //////////////////////////////////////////////////////////////

// initial SVG, margins, width, and height
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const thickness = 40; // defines innerRadius
const duration = 750;

const radius = Math.min(width, height) / 2;
const color = d3.scaleOrdinal(d3.schemeSet1);


const data = [
  { name: "USA", value: 40 },
  { name: "UK", value: 20 },
  { name: "Canada", value: 30 },
  { name: "Mexico", value: 10 },
];

let text = ''; // needs to become a dynamic total added to data binding

const svg = d3.select('body')
  .append('svg')
  .attr('class', 'pie')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

const arc = d3.arc()
  .innerRadius(radius - thickness)
  .outerRadius(radius);

// const pie = d3.pie()
//   .value(d => d.value)
//   .sort(null);

// const path = g.selectAll('path')
//   .data(pie(data))
//   .enter()
//   .append("g")
//   .on("mouseover", function (d) {

//     let g = d3.select(this)
//       .style("cursor", "pointer")
//       .style("fill", "black")
//       .append("g")
//       .attr("class", "text-group");

//     g.append("text")
//       .attr("class", "name-text")
//       .text(`${d.data.name}`)
//       .attr('text-anchor', 'middle')
//       .attr('dy', '-1.2em');

//     g.append("text")
//       .attr("class", "value-text")
//       .text(`${d.data.value}`)
//       .attr('text-anchor', 'middle')
//       .attr('dy', '.6em');
//   })
//   .on("mouseout", function (d) {
//     d3.select(this)
//       .style("cursor", "none")
//       .style("fill", color(this._current))
//       .select(".text-group").remove();
//   })
//   .append('path')
//   .attr('d', arc)
//   .attr('fill', (d, i) => color(i))
//   .on("mouseover", function (d) {
//     d3.select(this)
//       .style("cursor", "pointer")
//       .style("fill", "black");
//   })
//   .on("mouseout", function (d) {
//     d3.select(this)
//       .style("cursor", "none")
//       .style("fill", color(this._current));
//   })
//   .each(function (d, i) { this._current = i; });

// g.append('text')
//   .attr('text-anchor', 'middle')
//   .attr('dy', '.35em')
//   .text(text);

d3.json('data/data.json').then(data => {

  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

  const path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function (d) {

      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black")
        .append("g")
        .attr("class", "text-group");

      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em');

      g.append("text")
        .attr("class", "value-text")
        .text(`${d.data.value}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i))
    .on("mouseover", function (d) {
      d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black");
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current));
    })
    .each(function (d, i) { this._current = i; });

  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .text(text);


  // log data
  console.log(data);

}).catch(error => {
  console.log(error);
})