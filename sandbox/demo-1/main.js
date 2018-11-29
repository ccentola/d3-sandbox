// // change div border color and style
// d3.select('#someDiv').style('border', '5px darkgray dashed');

// // change div id
// d3.select('#someDiv').attr('id', 'newID');

// // set checkbox property to checked
// d3.select('#someCheckbox').property('checked', true)

// // add text to the div
// d3.select('div').style('background', 'lightblue').style('border', 'solid black 1px').html('Youhave now dynamically changed this web page contnet');
// const svg = d3.select('svg');
// const height = +svg.attr('height');

// console.log(height)

// d3.select('#path-2').attr('transform', `translate(0,${height + 100})`);
// d3.select('#path-3').attr('transform', 'translate(0,300)');
// d3.select('#path-4').attr('transform', 'translate(0,400)');

// d3.selectAll('div').data([1, 2, 3, 4, 5]).enter().append('div').html('wow').append('span').html('even more wow').style('font-weight', '900');

// // append a div to the body
// d3.select('body').append('div')
//   .style('border', '1px black solid')
//   .html('hello world');

// d3.select('div')
//   .style('background', 'pink')
//   .style('font-size', '24px')
//   .attr('id', 'newDiv')
//   .attr('class', 'd3div')
//   .on('click', () => { console.log('you clicked a div!') });

// HELLO WORLD //
// create a line
d3.select('svg')                                // select the svg element
  .append('line')                               // append the line svg
  .attr('x1', 20).attr('y1', 20)                // set var 1 coords
  .attr('x2', 400).attr('y2', 400)              // set var 2 coords
  .style('stroke', 'black')                     // set stroke to black
  .style('stroke-width', '2px');                // set stroke width

// create a circle; top left
d3.select('svg')                                // select svg element
  .append('circle')                             // append a circle
  .attr('cx', 20)                               // set x coordinate
  .attr('cy', 20)                               // set y coordinate
  .attr('r', 10)                                // set radius from center
  .style('fill', 'red');                        // set fill (color)

// add "HELLO" to top left
d3.select('svg')                                // select svg element
  .append('text')                               // append text
  .attr('id', 'a')                              // add id of "a"
  .attr('x', 20)                                // set x coord
  .attr('y', 20)                                // set y coord
  .style('font-size', '25px')                   // define font style
  .style('opacity', 0)                          // set opacity
  .text('HELLO');                               // define actual text


// create a larger circle; bottom right
d3.select('svg')                                // select svg element
  .append('circle')                             // append a circle
  .attr('cx', 400)                              // set x coordinate
  .attr('cy', 400)                              // set y coordinate
  .attr('r', 40)                                // set radius
  .style('fill', 'lightblue');                  // set fill

// add "um, hi" to bottom right
d3.select('svg')                                // select svg
  .append('text')                               // append text
  .attr('id', 'b')                              // add id of "b"
  .attr('x', 400)                               // set x coordinate
  .attr('y', 400)                               // set y coordinate
  .style('opacity', 0)                          // set opacity
  .text('um, hi!');                             // define text

// set transitions
d3.select('#a').transition().duration(1000).style('opacity', 1);
d3.select('#b').transition().duration(3000).style('opacity', .75);

