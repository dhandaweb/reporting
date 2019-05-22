import React from 'react';
import * as d3 from "d3";

export default class VerticalBar extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
      this.chartId =  'VerticalBar' + Math.floor(Math.random() * 1000000000);
      this.chartContainer = null
    }


drawChart(){

    var data = [10, 20, 100];

    var chartId =  '#' + this.chartId;

    d3.select(chartId).selectAll("svg").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width -40,
        height = dimension.width -40;
    
    
   

    var svg = this.chartContainer =  d3.select(chartId).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        svg.append("text").text("This is vertical bar chart");
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