// d3.csv("names_by_8.csv", function(error, data) {
//   if (error) throw error;
//   console.log(data);
// });

var babyNames = [[[]]];
var array;
d3.text("names_by_8_transposed.csv", function(error, data) {
  if (error) throw error;
//  console.log(data);
  array = csvToArray(data);
  //console.log(array);

  var j = 0;
  for(var i = 584; i < 592; i = i + 1 ) {
    babyNames[0][j] = array[i];
    j = j + 1;
  }
  console.log(babyNames[0]);

var tr = d3.select("body")
  .append("table")
  .selectAll("tr")
  .data(babyNames[0])
  .enter().append("tr");

var td = tr.selectAll("td")
  .data(function(d) { return d; })
  .enter().append("td")
    .text(function(d) { return d; });  

  // var tr = d3.select("body")
  // .append("table")
  // .selectAll("tr")
  // .data(babyNames[0])
  // .enter().append("tr");


});

// Papa.parse("names_by_8.csv", {
//   complete: function(results) {
//     console.log(results);
//   }
// });

function csvToArray (csv) {
    rows  = csv.split("\n");
    return rows.map(function (row) {
      return row.split(",");
    });
};


// // Hard-coded for brevity, but you can set this variable with FileReader
// var csv   = "the,quick,brown,fox\n"+
//           "jumps,over,the,lazy,dog";

//var array = csvToArray(csv);

//console.log(array);
