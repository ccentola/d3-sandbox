const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const fader = color => {
  return d3.interpolateRgb(color, '#fff')(0.2);
};
const color = d3.scaleOrdinal(d3.schemeSet1.map(fader));
const format = d3.format(',d');

const treemap = d3
  .treemap()
  .tile(d3.treemapResquarify)
  .size([width, height])
  .round(true)
  .paddingInner(1);

d3.json('data/data.json').then(data => {
  // define root
  const root = d3
    .hierarchy(data)
    .eachBefore(function(d) {
      d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
    })
    .sum(sumBySize)
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });

  treemap(root);

  //
  const cell = svg
    .selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', d => {
      return `translate(${d.x0},${d.y0})`;
    });

  cell
    .append('rect')
    .attr('id', d => {
      return d.data.id;
    })
    .attr('width', d => {
      return d.x1 - d.x0;
    })
    .attr('height', d => {
      return (d.y1 = d.y0);
    })
    .attr('fill', d => {
      return color(d.parent.data.id);
    });

  cell
    .append('clipPath')
    .attr('id', d => {
      return `clip=${d.data.id}`;
    })
    .append('use')
    .attr('xlink:href', d => {
      return `#${d.data.id}`;
    });

  cell.append('title').text(d => {
    `${d.data.id} \n ${format(d.value)}`;
  });

  d3.selectAll('input')
    .data([sumBySize, sumByCount], d => {
      return d ? d.name : this.value;
    })
    .on('change', changed);

  const timeout = d3.timeout(() => {
    d3.select('input[value="sumByCount"]')
      .property('checked', true)
      .dispatch('change');
  }, 2000);

  function changed(sum) {
    timeout.stop();

    treemap(root.sum(sum));

    cell
      .transition()
      .duration(750)
      .attr('transform', d => {
        return `translate(${d.x0}, ${d.y0})`;
      })
      .select('rect')
      .attr('width', d => {
        return d.x1 - d.x0;
      })
      .attr('height', d => {
        return d.y1 - d.y0;
      });
  }

  // log data
  console.log(data);
});

// HELPER FUNCTIONS ///////////////////////////////////////////////////////////
function sumBySize(d) {
  return d.size;
}

function sumByCount(d) {
  return d.children ? 0 : 1;
}

// const tree = d3.tree().size([height, width - 160]);

// const stratify = d3.stratify().parentId(d => {
//   return d.id.substring(0, d.id.lastIndexOf('.'));
// });

// d3.csv('data/data.csv')
//   .then(data => {
//     // identify a root
//     const root = stratify(data).sort((a, b) => {
//       return a.height - b.height || a.id.localeCompare(b.id);
//     });

//     // link
//     const link = g
//       .selectAll('.link')
//       .data(tree(root).links())
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr(
//         'd',
//         d3
//           .linkHorizontal()
//           .x(d => {
//             return d.y;
//           })
//           .y(d => {
//             return d.x;
//           })
//       );

//     const node = g
//       .selectAll('.node')
//       .data(root.descendants())
//       .enter()
//       .append('g')
//       .attr('class', d => {
//         return `node ${d.children ? ' node--internal' : ' node--leaf'}`;
//       })
//       .attr('transform', d => {
//         return `translate(${d.y}, ${d.x})`;
//       });

//     node.append('circle').attr('r', 2.5);

//     node
//       .append('text')
//       .attr('dy', 3)
//       .attr('x', d => {
//         return d.children ? -8 : 8;
//       })
//       .style('text-anchor', d => {
//         return d.children ? 'end' : 'start';
//       })
//       .text(d => {
//         return d.id.substring(d.id.lastIndexOf('.') + 1);
//       });

//     // log data
//     console.log(data);
//     console.log(root);
//     console.log(tree(root));
//     console.log(tree(root).links());
//   })
//   .catch(error => {
//     // log error
//     console.log(error);
//   });
