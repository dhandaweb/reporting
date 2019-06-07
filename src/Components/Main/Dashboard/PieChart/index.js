import React from 'react';
import * as d3 from "d3";

export default class PieChart extends React.Component {


    constructor(props) {
        super(props);
        // this.state = {
        //     chartContainer:null
        //   };

        this.drawChart = this.drawChart.bind(this);
        this.chartId = 'pieChart' + Math.floor(Math.random() * 1000000000);
        this.chartContainer = null;

        // this.chartData = [
        //     { Measure: { value: 10000, formattedVal: "$10k" }, Dimension: { value: "One", formattedVal: "One" }, Group: "" },
        //     { Measure: { value: 20000, formattedVal: "$20k" }, Dimension: { value: "Two", formattedVal: "Two" }, Group: "" },
        //     { Measure: { value: 30000, formattedVal: "$30k" }, Dimension: { value: "Three", formattedVal: "Three" }, Group: "" },
        //     { Measure: { value: 5000, formattedVal: "$5k" }, Dimension: { value: "Four", formattedVal: "Four" }, Group: "" }
        // ];
        this.chartData = this.props.data;
        this.colorPallete = d3.scaleOrdinal()
            .range(["#01B8AA", "#374649", "#FD625E", "F2C80F", "5F6B6D", "#8AD4EB"]);
    }


    drawChart() {

        console.log(this.chartData);

        var chartId = '#' + this.chartId;
        d3.select(chartId).selectAll("svg").remove();

        var dimension = d3.select(chartId).node().getBoundingClientRect();

        var width = dimension.width - 40,
            height = dimension.width - 40,
            radius = (Math.min(width, height) / 2) * .7;

        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        var pie = d3.pie()
            .sort(null)
            .value((d) => d.Measure.value);

        this.chartContainer = d3.select(chartId)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = this.chartContainer.selectAll(".arc")
            .data(pie(this.chartData))
            .enter()
            .append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", (d) => this.colorPallete(d.data.Dimension.value));


        var text = g
            .append("text")
            .attr("dy", ".35em")
            .attr("style", "fill:#000;font-size:12px")
            .text((d) => (d.data.Dimension.value.length < 8 ? d.data.Dimension.value : d.data.Dimension.value.substring(0, 7) + ".."));

            text.append("title").text((d) => d.data.Dimension.value);

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.transition().duration(1000)
            .attrTween("transform", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });

        var polyline = g
            .append("polyline")
            .attr("style", "fill:none;stroke:#8c8c8c;");

        polyline.transition().duration(1000)
            .attrTween("points", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });

        polyline.exit()
            .remove();


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