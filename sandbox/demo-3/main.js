// add an svg element to the page
const svg = d3.select('body').append('svg')
  .attr('width', 500)
  .attr('height', 500)
  .style('background', 'lightgray');

// add h line
svg.append('line')
  .attr('x1', 100)
  .attr('y1', 250)
  .attr('x2', 400)
  .attr('y2', 250)
  .style('stroke', 'black')
  .style('stroke-width', '1px');

// add v line
svg.append('line')
  .attr('x1', 250)
  .attr('y1', 100)
  .attr('x2', 250)
  .attr('y2', 400)
  .style('stroke', 'black')
  .style('stroke-width', '1px');

function circleTransition() {

  const circleOne = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 250)
    .attr('fill', 'red')
    .attr('r', 10);
  repeat();

  const circleTwo = svg.append('circle')
    .attr('cx', 400)
    .attr('cy', 250)
    .attr('fill', 'blue')
    .attr('r', 10);

  repeat();

  const circleThree = svg.append('circle')
    .attr('fill', 'green')
    .attr('r', 10);

  repeat();

  const circleFour = svg.append('circle')
    .attr('fill', 'yellow')
    .attr('r', 10);

  repeat();

  function repeat() {
    circleOne
      .transition()
      .duration(2000)
      .attr('cx', 400)
      .on('end', repeat);

    circleTwo
      .transition()
      .duration(2000)
      .attr('cx', 100)
      .on('end', repeat);
  }

}

circleTransition();