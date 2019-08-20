import React from 'react';
import * as d3 from "d3";
import Options from './../chartOptions';
import $ from 'jquery';
export default class Bubble extends React.Component {


  constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
    this.chartId = 'Bubble' + Math.floor(Math.random() * 1000000000);
    this.chartContainer = null;
    
  }

  classes(root) {
    var classes = [];

    function recurse(name, node) {
      if (node.children) node.children.forEach(function (child) { recurse(node.Dimension.value, child); });
      else classes.push({ packageName: name, className: node.Dimension.value, value: node.Measure.value });
    }

    recurse(null, root);
    return { children: classes };
  }

  drawChart() {

    this.colorPallete = d3.scaleOrdinal().range(Options.colorRange);
    var chartId = '#' + this.chartId;
    this.rawData = this.props.data;

    d3.select(chartId).selectAll("svg").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width,
      height = dimension.width;

    var bubble = d3.pack()
      .size([width, height])
      .padding(1.5);

    var root = d3.hierarchy(this.classes({ Dimension: { value: 'Parent' }, children: this.rawData }))
      .sum(d => d.value)
      .sort(function (a, b) { return b.value - a.value; });


    this.chartContainer = d3.select(chartId)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    bubble(root);
    var node = this.chartContainer.selectAll(".node")
      .data(root.children)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    var circle = node.append("circle")
      .attr("r", d => d.r)
      .style("fill", d => this.colorPallete(d.data.className));


    var text = node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text(d => d.data.className.substring(0, d.r / 5));


    circle.on("mouseenter", function (d) {

      var content = d.data.className + ": " + d.value

      $(this).popover({
        placement: 'top',
        content: content,
        title: d.data.className,
        trigger: "hover",
        container: 'body'
      });

      $(this).popover('show');
    })
      .on("mouseleave", function (d) {
        $(this).popover('hide');
      })
  }

  componentDidUpdate() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart);
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