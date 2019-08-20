import React from 'react';
import * as d3 from "d3";
import Options from './../chartOptions';
import $ from 'jquery';

export default class TreeMap extends React.Component {


  constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
    this.chartId = 'TreeMap' + Math.floor(Math.random() * 1000000000);
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
    var data = { Dimension: { value: 'Parent' }, Measure: { value: 0 }, children: this.rawData };

    d3.select(chartId).selectAll("svg").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width,
      height = dimension.width;

    const treemap = d3.treemap().size([width, height]);

    const root = d3.hierarchy(data, (d) => d.children).sum((d) => { console.log(d); return d.Measure.value });

    const tree = treemap(root);

    this.chartContainer = d3.select(chartId)
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    const node = this.chartContainer.datum(root).selectAll(".node")
      .data(tree.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => { return "translate(" + d.x0 + "," + d.y0 + ")" });

    node.append("rect")
          .attr("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
          .attr("height", (d) => Math.max(0, d.y1 - d.y0 - 1) + "px")
          .attr("fill", (d) => this.colorPallete(d.data.Dimension.value))

    node.append("text")
    .attr("fill","#fff")
    .attr("transform", (d) => { return "translate(" + 5 + "," + 20 + ")" })
    .text((d) => {
      var x= Math.max(1, d.x1 - d.x0 - 1);
      var text = d.data.Dimension.value.substring(0, x/12);

      if (Math.max(0, d.y1 - d.y0 - 1) < 20) text = '';
      return text;
    
    });


    node.on("mouseenter", function (d) {

      var content = d.data.Dimension.value + ": " + d.data.Measure.value

      $(this).popover({
        placement: 'top',
        content: content,
        title: d.data.Dimension.value,
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