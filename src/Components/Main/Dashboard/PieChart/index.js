import React from 'react';
import * as d3 from "d3";
import Typography from '@material-ui/core/Typography';
import $ from 'jquery'; 
import Options from './../chartOptions';


export default class PieChart extends React.Component {


    constructor(props) {
        super(props);
        // this.state = {
        //     chartContainer:null
        //   };

        this.drawChart = this.drawChart.bind(this);
        this.chartId = 'pieChart' + Math.floor(Math.random() * 1000000000);
        this.chartContainer = null;

      
    }


    drawChart() {

        this.chartData = this.props.data;

        this.colorPallete = d3.scaleOrdinal()
                                .range(Options.colorRange);

        var chartId = '#' + this.chartId;
        d3.select(chartId).selectAll("svg").remove();

        var dimension = d3.select(chartId).node().getBoundingClientRect();

        var width = dimension.width,
            height = dimension.width,
            radius = (Math.min(width, height) / 2);

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

        var path = g.append("path")
                    .attr("d", arc)
                    .style("fill", (d) => this.colorPallete(d.data.Dimension.value))
                    .style("cursor","pointer");

        path.on("mouseenter", function(d){
                    var d= d.data;
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
                        });


    }

    componentDidUpdate(){
        this.drawChart();
    }

    componentDidMount() {
        this.drawChart();
        window.addEventListener("resize", this.drawChart);
    }

    render() {

        var legend =  this.props.data.map((item,i)=>{
            return  <div key={i} className="legendItem">
            <div className="legendIcon" style={{background:Options.colorRange[i]}}></div>
            <div className="legendText"><Typography color="textSecondary" gutterBottom> {item.Dimension.value}</Typography></div>
        </div>
        });

        return (<div>
                    <div id={this.chartId}></div>
                    <div className="legend"> {legend} </div>
            </div>
        );
    }
};