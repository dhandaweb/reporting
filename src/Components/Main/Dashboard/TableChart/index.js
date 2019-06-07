import React from 'react';
import * as d3 from "d3";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


export default class TableChart extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
    this.drawChart = this.drawChart.bind(this);
      this.chartId =  'Table' + Math.floor(Math.random() * 1000000000);
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


      this.rawData = this.props.data;

    }


drawChart(){

    var data = [10, 20, 100];

    var chartId =  '#' + this.chartId;

    d3.select(chartId).selectAll(".tableR").remove();

    var dimension = d3.select(chartId).node().getBoundingClientRect();

    var width = dimension.width ,
        height = dimension.width -40;
    
    
   

    var svg = this.chartContainer =  d3.select(chartId).append("div")
       .attr("class",".tableR")
}

componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart);
}

render() {
   
    return (
      <div id={this.chartId}>
        <Table>
          <TableBody>
            {this.rawData.map((row,i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.Group.formattedVal}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Dimension.formattedVal}
                </TableCell>
                <TableCell align="right">
                   {row.Measure.formattedVal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
      </div>
    );
  }
};