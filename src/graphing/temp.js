var cloudFill = d3.scale.category20();

var cloudLayout = cloud()
  .size([500, 500])
  .words([
    "Hello", "world", "normally", "you", "want", "more", "words",
    "than", "this"].map(function (d) {
      return { text: d, size: 10 + Math.random() * 90, test: "haha" };
    }))
  .padding(5)
  .rotate(function () { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .fontSize(function (d) { return d.size; })
  .on("end", cloudDraw);

cloudLayout.start();

function cloudDraw(words) {
  d3.select("body").append("svg")
    .attr("width", cloudLayout.size()[0])
    .attr("height", cloudLayout.size()[1])
    .append("g")
    .attr("transform", "translate(" + cloudLayout.size()[0] / 2 + "," + cloudLayout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function (d, i) { return cloudFill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}