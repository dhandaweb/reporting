import React from 'react';
import * as d3 from "d3";

export default class PieChart extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };

     this.drawChart = this.drawChart.bind(this);
      this.chartId =  'pieChart' + Math.floor(Math.random() * 1000000000);
      this.chartContainer = null
    }


drawChart(){

    var data = [10, 20, 100];
    var chartId =  '#' + this.chartId;
    d3.select(chartId).selectAll("svg").remove();
console.log(chartId);
    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width -40,
        height = dimension.width -40,
        radius = Math.min(width, height) / 2;
    
    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);
    
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = this.chartContainer =  d3.select(chartId).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");
    
      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data); });
    
      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });

}

componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart);
}

render() {
   
    return (
      <div id={this.chartId}></div>
    );
  }
};