const svg = d3.select('#chart-area').append('svg')
    .attr('width', 500)
    .attr('height', 500);

d3.json('data/buildings.json').then(data => {

    // 2. clean/format data
    data.forEach(d => {
        d.height = +d.height;
    })

    // 3. add scales
    // create a linear scale for our y axis
    const y = d3.scaleLinear()
        .domain([0, 828]) // input values from your data
        .range([0, 400]); // output values to your chart dimensions

    // 4. init bars
    const bars = svg.selectAll('rect')
        .data(data);

    // 5. draw bars
    bars.enter()
        .append('rect')
        .attr('x', (d, i) => i * 25)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', d => y(d.height)); // apply scale to bar heights

    // 1. log data
    console.log(data);
})
