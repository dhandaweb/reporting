import React from 'react';
import * as d3 from "d3";

export default class VerticalBar extends React.Component {


  constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
    this.chartId = 'VerticalBar' + Math.floor(Math.random() * 1000000000);
    this.chartContainer = null;
    this.chartData = [
      { Measure: { value: 10000, formattedVal: "$10k" }, Dimension: { value: "One", formattedVal: "One" }, Group: "" },
      { Measure: { value: 20000, formattedVal: "$20k" }, Dimension: { value: "Two", formattedVal: "Two" }, Group: "" },
      { Measure: { value: 30000, formattedVal: "$30k" }, Dimension: { value: "Three", formattedVal: "Three" }, Group: "" },
      { Measure: { value: 50000, formattedVal: "$5k" }, Dimension: { value: "Four", formattedVal: "Four" }, Group: "" }
    ];

    this.colorPallete = d3.scaleOrdinal().range(["#01B8AA", "#374649", "#FD625E", "#F2C80F", "#5F6B6D", "#8AD4EB"]);

  }


  drawChart() {

    var data = [10, 20, 100];

    var chartId = '#' + this.chartId;

    d3.select(chartId).selectAll(".verticalBar").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width - 40,
      height = dimension.width - 40;

    this.chartContainer = d3.select(chartId)
      .append("table")
      .attr("class", "verticalBar")
      .attr("style", "width:100%")
      .append("tbody");

    var row = this.chartContainer.selectAll(".bar")
      .data(this.chartData)
      .enter()
      .append("tr")
      .append("td")
      .attr("style", "border-bottom:1px solid #f6f6f6");

    var topDiv = row.append("div").attr("style", "font-size:12px;height:18px;color:rgba(0, 0, 0, 0.54)");

    topDiv.append("span")
      .attr("style", "float:left")
      .html(d => d.Dimension.value);

    topDiv.append("span")
      .attr("style", "float:right")
      .html(d => d.Measure.formattedVal);

    var domain = this.chartData.map(d => d.Measure.value);

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(domain)])
      .range([0, width]);

    row.append("div")
      .attr("style", "margin-bottom:5px;")
      .style("background-color", (d) => this.colorPallete(d.Dimension.value))
      .style("width", d => xScale(d.Measure.value) + "px")
      .style("height", "18px");

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