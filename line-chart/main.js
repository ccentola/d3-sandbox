const chart = new Chart({
  element: document.querySelector('.chart-container1'),
  data: [
    [new Date(2016, 0, 1), 10],
    [new Date(2016, 1, 1), 70],
    [new Date(2016, 2, 1), 30],
    [new Date(2016, 3, 1), 10],
    [new Date(2016, 4, 1), 40]
  ]
});

// change line colour on click
d3.selectAll('button.color').on('click', function () {
  const color = d3.select(this).text().split(' ')[0];
  chart.setColor(color);
});

// change data on click to something randomly-generated
d3.selectAll('button.data').on('click', () => {
  chart.setData([
    [new Date(2016, 0, 1), Math.random() * 100],
    [new Date(2016, 1, 1), Math.random() * 100],
    [new Date(2016, 2, 1), Math.random() * 100],
    [new Date(2016, 3, 1), Math.random() * 100],
    [new Date(2016, 4, 1), Math.random() * 100]
  ]);
});

// redraw chart on each resize
// in a real-world example, it might be worth ‘throttling’ this
// more info: http://sampsonblog.com/749/simple-throttle-function
d3.select(window).on('resize', () => chart.draw());