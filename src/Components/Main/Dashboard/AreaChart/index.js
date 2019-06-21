import React from 'react';
import * as d3 from "d3";

export default class AreaChart extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
      this.chartId =  'LineChart' + Math.floor(Math.random() * 1000000000);
      this.chartContainer = null;

      this.rawData = [
        { Measure: { value: 10000, formattedVal: "$10k" }, Dimension: { value: "One", formattedVal: "One" }, Group: { value: "Group1", formattedVal: "Group1" }},
        { Measure: { value: 15000, formattedVal: "$20k" }, Dimension: { value: "Two", formattedVal: "Two" }, Group: { value: "Group1", formattedVal: "Group1" } },
        { Measure: { value: 30000, formattedVal: "$30k" }, Dimension: { value: "Three", formattedVal: "Three" }, Group: { value: "Group1", formattedVal: "Group1" } },
        { Measure: { value: 50000, formattedVal: "$50k" }, Dimension: { value: "Four", formattedVal: "Four" }, Group: { value: "Group1", formattedVal: "Group1" }},
        { Measure: { value: 15000, formattedVal: "$10k" }, Dimension: { value: "One", formattedVal: "One" }, Group: { value: "Group2", formattedVal: "Group2" }},
        { Measure: { value: 70000, formattedVal: "$20k" }, Dimension: { value: "Two", formattedVal: "Two" }, Group: { value: "Group2", formattedVal: "Group2" } },
        { Measure: { value: 30000, formattedVal: "$30k" }, Dimension: { value: "Three", formattedVal: "Three" }, Group: { value: "Group2", formattedVal: "Group2" } },
        { Measure: { value: 60000, formattedVal: "$50k" }, Dimension: { value: "Four", formattedVal: "Four" }, Group: { value: "Group2", formattedVal: "Group2" }},
      ];

     
    }


drawChart(){
  this.rawData = this.props.data;
  this.chartData = d3.nest()
            .key(d=> d.Group.value)
            .entries(this.rawData);

  this.colorPallete = d3.scaleOrdinal().range(["#01B8AA", "#374649", "#FD625E", "#F2C80F", "#5F6B6D", "#8AD4EB"]);
    var valData = this.rawData.map(d=>d.Measure.value);

    var chartId =  '#' + this.chartId;

    d3.select(chartId).selectAll("svg").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var margin = {top: 10, right: 10, bottom: 20, left: 30};
    var width = dimension.width - margin.right - margin.left;
    var height = dimension.width - margin.top - margin.bottom;

    var xScale = d3.scaleBand()
                .rangeRound([0, width])
                .domain(this.rawData.map(d=>d.Dimension.value))
                .paddingInner(0.1);
      
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(valData)])
                   .range([height,0]);
   
    this.chartContainer = d3.select(chartId)
                            .append("svg")
                            .attr("width", dimension.width)
                            .attr("height", dimension.width);

    var yAxis = d3.axisLeft(yScale)
                  .tickSize(-width)
                  .ticks(7)
                  .tickFormat(d3.format(".0s"));

    this.chartContainer.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
                        .call(yAxis);

    this.chartContainer.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                        .call(d3.axisBottom(xScale));

    var lineGroup = this.chartContainer
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        var area = d3.area()
                     .x(d=> (xScale.bandwidth()/2 + xScale(d.Dimension.value))) 
                     .y0(height)
                     .y1(d=> yScale(d.Measure.value)) 
                     .curve(d3.curveLinear) 
    
   
    var line = d3.line()
                        .x(d=> (xScale.bandwidth()/2 + xScale(d.Dimension.value))) 
                        .y(d=> yScale(d.Measure.value)) 
                        .curve(d3.curveLinear) 

    var lineG = lineGroup.selectAll(".lineG")
                        .data(this.chartData)
                        .enter()
                        .append("g");
                  
    
     lineG
                     .append("path")
                     .attr("style","fill-opacity:.5;")
                     .style("fill", (d) => this.colorPallete(d.key))
                     .attr("d", d=> area(d.values))  
                        lineG
                     .append("path")
                     .attr("style","fill:none;stroke-width:3px")
                     .style("stroke", (d) => this.colorPallete(d.key))
                     .attr("d", d=> line(d.values))
     
              
}

componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart);
}
componentDidUpdate(){
  this.drawChart();
}
render() {
   
    return (
      <div id={this.chartId}></div>
    );
  }
};