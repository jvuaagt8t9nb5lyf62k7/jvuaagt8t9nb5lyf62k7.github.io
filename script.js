var svg = d3.select("svg"),
  margin = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
  },
  width = svg.attr("width") - margin.left - margin.right,
  height = svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");
var x = d3.scaleTime().range([0, width]),
  y = d3.scaleLinear().range([0, height]),
  z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
  .defined(function(d) {
    return d.nameRank;
  })
  .curve(d3.curveBasis)
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d.nameRank);
  });

d3.csv("f100.csv", type, function(error, data) {
  if (error) throw error;

  var babyNames = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {
          date: d.date,
          nameRank: d[id]
        };
      })
    };
  });

  x.domain(d3.extent(data, function(d) {
    return d.date;
  }));

  y.domain([
    d3.min(babyNames, function(c) {
      return d3.min(c.values, function(d) {
        return d.nameRank;
      });
    }),
    d3.max(babyNames, function(c) {
      return d3.max(c.values, function(d) {
        return d.nameRank;
      });
    })
  ]);

  z.domain(babyNames.map(function(c) {
    return c.id;
  }));

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))

  var nameLines = g.selectAll(".city")
    .data(babyNames)
    .enter().append("g")
    .attr("class", "city");

  nameLines.append("path")
    .attr("class", "line")
    .attr("id", function(d) {
      return d.id;
    })
    .attr("d", function(d) {
      return line(d.values);
    })
    .style("stroke", function(d) {
      return z(d.id);
    })
    .on("mouseover", function(d) {
      d3.select(this).style("opacity", 1);
      g.append('text')
         .classed('info', true)
         .attr('x', (d3.event.pageX) + "px")   
         .attr('y', (d3.event.pageY) + "px")           
         .text(d.id);
    })
    .on("mouseout", function(d) {
      d3.select(this).style("opacity", 0.5);
      d3.select('text.info').remove();
    }); 
});

function type(d, _, columns) {
  d.date = parseTime(d.date);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}