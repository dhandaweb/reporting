import React from 'react';
import * as d3 from "d3";
import $ from 'jquery'; 

export default class BarChart extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
      this.chartId =  'barChart' + Math.floor(Math.random() * 1000000000);
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
   
    this.colorPallete = d3.scaleOrdinal().range(["#01B8AA", "#374649", "#FD625E", "#F2C80F", "#5F6B6D", "#8AD4EB"]);
    var chartId =  '#' + this.chartId;
 this.rawData = this.props.data;

      this.chartData = d3.nest()
                .key(d=> d.Group.value)
                .entries(this.rawData);

                var valData = this.rawData.map(d=>d.Measure.value);

    d3.select(chartId).selectAll("svg").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var h = Math.min(dimension.width,450);
    var margin = {top: 10, right: 10, bottom: 20, left: 30};
    var width = dimension.width - margin.right - margin.left;
    var height =  h- margin.top - margin.bottom;
 
    var xScale = d3.scaleBand()
                .rangeRound([0, width])
                .domain(this.rawData.map(d=>d.Dimension.value))
                .paddingInner(0.1);
      
    var xScale1 = d3.scaleBand()
              .rangeRound([0, xScale.bandwidth()])
               .domain(this.chartData.map(d=>d.key))
               .padding(0.05);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(valData)])
                   .rangeRound([height,0]);
   
    this.chartContainer = d3.select(chartId)
                            .append("svg")
                            .attr("width", dimension.width)
                            .attr("height",h);

    var yAxis = d3.axisLeft(yScale)
                  .tickSize(-width)
                  .ticks(7)
                  .tickFormat(d3.format(".0s"));

    this.chartContainer.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
                        .call(yAxis);


    var barGroup = this.chartContainer
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.chartContainer.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                        .call(d3.axisBottom(xScale));

    

    var barsG = barGroup.selectAll(".barG")
                        .data(this.chartData)
                        .enter()
                        .append("g")
                        .style("fill", (d) => this.colorPallete(d.key))
                        .attr("transform", function(d, i) { return "translate(" + xScale1(d.key) + ",0)"; })
                  
    var bars = barsG.selectAll(".bars")
                       .data(d=>d.values)
                     .enter()
                     .append("rect")
                       .attr("width", xScale1.bandwidth())
                       .attr("height",  d=> height - yScale(d.Measure.value))
                       .attr("x", d=> xScale(d.Dimension.value))
                       .attr("y", d=> yScale(d.Measure.value));

    bars.on("mouseenter", function(d){
 
                        var content = d.Dimension.value + ": " +  d.Measure.formattedVal
                        
                            $(this).popover({
                              placement: 'right',
                              content:content,
                              title: d.Dimension.value,
                              trigger:"hover",
                              container:'body'
                            });
                            
                            $(this).popover('show');
                        })
                        .on("mouseleave", function(d){
                              $(this).popover('hide');
                        })
                             
}

componentDidUpdate(){
  this.drawChart();
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