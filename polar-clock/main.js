//==============================================================================
// HEADER
//==============================================================================

// title
const title = 'Polar Clock';

// set title
document.title = title;

// add in document title
d3.select('body').append('h1').text(title);

//==============================================================================
// PARAMETERS
//==============================================================================

// margins, height, and width
const width = 960;
const height = 500;
const radius = Math.min(width, height) / 1.9;
const bodyRadius = radius / 23;
const dotRadius = bodyRadius - 8;

const svg = d3.select('body').append('svg').attr('height', height).attr('width', width);

const duration = 750;
const now = new Date(Date.now() + 2 * duration);

const pi = Math.PI;
const tau = pi * 2;

const fields = [
  { radius: 0.2 * radius, interval: d3.timeYear, subinterval: d3.timeMonth, format: d3.timeFormat("%b") },
  { radius: 0.3 * radius, interval: d3.timeMonth, subinterval: d3.timeDay, format: d3.timeFormat("%d") },
  { radius: 0.4 * radius, interval: d3.timeWeek, subinterval: d3.timeDay, format: d3.timeFormat("%a") },
  { radius: 0.6 * radius, interval: d3.timeDay, subinterval: d3.timeHour, format: d3.timeFormat("%H") },
  { radius: 0.7 * radius, interval: d3.timeHour, subinterval: d3.timeMinute, format: d3.timeFormat("%M") },
  { radius: 0.8 * radius, interval: d3.timeMinute, subinterval: d3.timeSecond, format: d3.timeFormat("%S") }
];

const color = d3.scaleSequential()
  .domain([0, 360])
  .interpolator(d3.interpolateRainbow);

var arcBody = d3.arc()
  .startAngle(function (d) { return bodyRadius / d.radius; })
  .endAngle(function (d) { return -pi - bodyRadius / d.radius; })
  .innerRadius(function (d) { return d.radius - bodyRadius; })
  .outerRadius(function (d) { return d.radius + bodyRadius; })
  .cornerRadius(bodyRadius);

var arcTextPath = d3.arc()
  .startAngle(function (d) { return -bodyRadius / d.radius; })
  .endAngle(-pi)
  .innerRadius(function (d) { return d.radius; })
  .outerRadius(function (d) { return d.radius; });

var g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

g.append("g")
  .attr("class", "tracks")
  .selectAll("circle")
  .data(fields)
  .enter().append("circle")
  .attr("r", function (d) { return d.radius; });

var body = g.append("g")
  .attr("class", "bodies")
  .selectAll("g")
  .data(fields)
  .enter().append("g");

body.append("path")
  .attr("d", function (d) {
    return arcBody(d)
      + "M0," + (dotRadius - d.radius)
      + "a" + dotRadius + "," + dotRadius + " 0 0,1 0," + -dotRadius * 2
      + "a" + dotRadius + "," + dotRadius + " 0 0,1 0," + dotRadius * 2;
  });

body.append("path")
  .attr("class", "text-path")
  .attr("id", function (d, i) { return "body-text-path-" + i; })
  .attr("d", arcTextPath);

var bodyText = body.append("text")
  .attr("dy", ".35em")
  .append("textPath")
  .attr("xlink:href", function (d, i) { return "#body-text-path-" + i; });

tick();

d3.timer(tick);

function tick() {
  var now = Date.now();

  fields.forEach(function (d) {
    var start = d.interval(now),
      end = d.interval.offset(start, 1);
    d.angle = Math.round((now - start) / (end - start) * 360 * 100) / 100;
  });

  body
    .style("fill", function (d) { return color(d.angle); })
    .attr("transform", function (d) { return "rotate(" + d.angle + ")"; });

  bodyText
    .attr("startOffset", function (d, i) { return d.angle <= 90 || d.angle > 270 ? "100%" : "0%"; })
    .attr("text-anchor", function (d, i) { return d.angle <= 90 || d.angle > 270 ? "end" : "start"; })
    .text(function (d) { return d.format(now); });
}

function formatDate(d) {
  d = new Date(d).getDate();
  switch (10 <= d && d <= 19 ? 10 : d % 10) {
    case 1: d += "st"; break;
    case 2: d += "nd"; break;
    case 3: d += "rd"; break;
    default: d += "th"; break;
  }
  return d;
}

//==============================================================================
// DRAW
//==============================================================================

// d3.csv('data/data_tidy.csv').then(data => {

//   // log data
//   console.log(data);

// }).catch(error => {

//   //
//   console.log(error);
// })
