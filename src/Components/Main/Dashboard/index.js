import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as d3 from "d3";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Filters from './Filters';
import PieChart from './PieChart';
import BarChart from './BarChart';
import VerticalBar from './VerticalBar';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import DotPlot from './DotPlot';
import TableChart from './TableChart';
import IconCard from './IconCard';
import axios from 'axios';
import DashboardIcon from '@material-ui/icons/Dashboard';
import env from '../../../environment.json';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.getChart = this.getChart.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.getDashboardData = this.getDashboardData.bind(this);

    this.state = {
      dashboardData: [], 
      filterData:[]
    };

    this.dashboardData =[];

    axios({
      method: 'post',
      url: env.endPointUrl + 'getDetails',
      data: {
        userId: localStorage.getItem('userId'),
				userGroupId: localStorage.getItem('userGroupId')
      }
    })
      .then(response => {
        this.setState({ detailData: response.data });
        this.dashboardData =response.data;
        this.getDashboardData(response.data);
        this.getFilterData(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
    
  }



  getChart(item) {
    switch (item.chart) {
      case "IconCard":
        return <IconCard data={item.data} />
        break;
      case "PieChart":
        return <PieChart data={item.data} />
        break;
      case "VerticalBar":
        return <VerticalBar data={item.data} />
        break;
      case "TableChart":
        return <TableChart data={item.data} />
        break;
      case "BarChart":
          return <BarChart data={item.data} />
          break;
      case "LineChart":
          return <LineChart data={item.data} />
          break;
      case "AreaChart":
          return <AreaChart data={item.data} />
          break;
      case "DotPlot":
          return <DotPlot data={item.data} />
          break;
    }
  }

  getDashboardData(data) {
    var dashboardData = [];
    this.setState({ dashboardData: dashboardData });

    dashboardData.push({
      title: "Total Revenue Amount",
      data: { icon: "money", value: d3.sum(data.map(d => d.revenueAmount)), color: "primary" },
      chart: "IconCard",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Net Revenue Amount",
      data: { icon: "money", value: d3.sum(data.map(d => d.netRevenue)), color: "secondary" },
      chart: "IconCard",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Total Billing Amount",
      data: { icon: "money", value: d3.sum(data.map(d => d.billingAmount)), color: "error" },
      chart: "IconCard",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Commision Amount",
      data: { icon: "money", value: d3.sum(data.map(d => d.commissionAmount)), color: "error" },
      chart: "IconCard",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Top cities",
      data: this.getFormattedData(this.getGroupedData("city", data)),
      chart: "PieChart",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Top sources",
      data: this.getFormattedData(this.getGroupedData("source", data)),
      chart: "VerticalBar",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Top Job category",
      data: this.getFormattedData(this.getGroupedData("jobCategory", data)),
      chart: "VerticalBar",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Job Types",
      data: this.getFormattedData(this.getGroupedData("jobType", data)),
      chart: "AreaChart",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Job Types",
      data: this.getFormattedData(this.getGroupedData("jobType", data)),
      chart: "BarChart",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Job Types",
      data: this.getFormattedData(this.getGroupedData("jobCategory", data)),
      chart: "LineChart",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });
    
    dashboardData.push({
      title: "Job Types",
      data: this.getFormattedData(this.getGroupedData("jobType", data)),
      chart: "AreaChart",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "City by Job category",
      data: data.map(d => {
        return {
          Measure: { value: d.revenueAmount, formattedVal: d.revenueAmount},
          Dimension: { value: d.city, formattedVal: d.city },
          Group:{ value: d.jobCategory, formattedVal: d.jobCategory }
        };
      }),
      chart: "DotPlot",
      gridSize: {xl:3, lg:3, md:3, sm:6, xs:12}
    });

    dashboardData.push({
      title: "Top candidates",
      data: this.getFormattedTableData(data),
      chart: "TableChart",
      gridSize: {xl:6, lg:6, md:6, sm:12, xs:12}
    });

    this.setState({ dashboardData: dashboardData });
   
  }

  getFilterData(data) {
    var filterData = [];
    
    filterData.push({
      title: "Top source",
      filterKey:"source",
      data: this.getGroupedData("source", data)
    });

    filterData.push({
      title: "Job category",
      filterKey:"jobCategory",
      data: this.getGroupedData("jobCategory", data)
    });

    this.setState({ filterData: filterData });

  }

  getGroupedData(groupBy, data) {

    return d3.nest()
      .key(d => d[groupBy])
      .entries(data);
  }

  getFormattedData(data) {

    return data.map(d => {
      return {
        Measure: { value: d3.sum(d.values.map(d => d.revenueAmount)), formattedVal: d3.sum(d.values.map(d => d.revenueAmount)) },
        Dimension: { value: d.key, formattedVal: d.key },
        Group: { value: '', formattedVal: '' }
      };
    });
  }

  getFormattedTableData(data) {

    return data.map(d => {
      return {
        Measure: { value: d.revenueAmount, formattedVal: d.revenueAmount },
        Dimension: { value: d.currentEmployer , formattedVal: d.currentEmployer },
        Group: { value: d.firstName + " " + d.lastName , formattedVal: d.firstName + " " + d.lastName }
      };
    });
  }

  setFilter(){
      var found= false;
      
      var updatedData = this.dashboardData.filter(item=>{
        found = false;
        this.state.filterData.forEach(filter => {
          if(item[filter.filterKey]){
             var vals = filter.data.filter(d=> d.isSelected).map(d=> d.key);
             if(vals.indexOf(item[filter.filterKey]) > -1) found = true;
          }
        });

        return !found;
      });

      this.getDashboardData(updatedData);

  }

  render() {
    return (
      <div>
        <Grid container spacing={24} className="mainContent">

        <div className="subHeading">
            <DashboardIcon className="dashboard"/>
            <Typography className="title" variant="subtitle1" noWrap> Dashboard</Typography>

            {this.state.filterData.map((item,i) => { return <Filters key={i} data={item} setFilter={this.setFilter}/>})}

            
        </div>

        {this.state.dashboardData.length === 0 &&
            <div className="progress"> <LinearProgress color="secondary"/> </div>
        }

        {this.state.dashboardData.map((item,i) => {

            return <Grid item xl ={item.gridSize.xl} lg={item.gridSize.lg} md={item.gridSize.md} sm={item.gridSize.sm} xs={item.gridSize.xs} key={i}>
                <Card >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom> {item.title}</Typography>
                    {this.getChart(item)}
                  </CardContent>
                </Card>
             </Grid>
           })
          }
         
        </Grid>
      </div>
    );
  }
};