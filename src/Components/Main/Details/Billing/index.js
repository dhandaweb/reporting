import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import options from './../../options';

import DateFnsUtils from '@date-io/date-fns';

export default class Billing extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.jobTypeList = options.jobTypeList;
    this.jobCategoryList = options.jobCategoryList;

    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;
    this.pipelineTypeList = options.pipelineTypeList;
    this.invoiceTypeList = options.invoiceTypeList;
    
    this.state = {
      pipelineType:"",
      invoiceType:"",
      invoiceNo:"",
      billingAmount:'',
      gst:'',
      invoiceAmount:'',
      orderBookAmount:'',
      orderBookDate:new Date(),
      revenueRealizationDate:new Date(), 
      revenueAmount:5500,
    };
  }



  render() {


    return (    <ValidatorForm
      ref="form"
      onSubmit={this.handleSubmit}
      onError={errors => console.log(errors)}
    >
     <Grid container >

<Grid item lg={4} className="paddingH">
      <Typography variant="h5" component="h3" > Invoice   </Typography>
      <TextValidator
          fullWidth 
          id="pipelineType"
          select
          label="pipelineType"
          value={this.state.pipelineType}
          validators={['required']}
          errorMessages={['Pipeline type is required']}
          onChange={(e) => this.setState({ pipelineType: e.target.value })}
          margin="normal">
                {this.pipelineTypeList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextValidator>


          <TextValidator
          fullWidth 
          id="invoiceType"
          select
          label="Invoice type"
          value={this.state.invoiceType}
          validators={['required']}
          errorMessages={['Invoice type is required']}
          onChange={(e) => this.setState({ invoiceType: e.target.value })}
          margin="normal">
                {this.invoiceTypeList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextValidator>


          <TextValidator
            fullWidth 
            id="invoiceNo"
            label="Invoice number"
            value={this.state.invoiceNo}
            validators={['required']}
            errorMessages={['invoiceNo is required']}
            onChange={(e) => this.setState({ invoiceNo: e.target.value })}
            margin="normal">
           </TextValidator>


      </Grid>
      
      <Grid item lg={4} className="paddingH">
      <Typography variant="h5" component="h3" > Billing   </Typography>
      <TextValidator
            fullWidth 
            id="billingAmount"
            label="Billing amount"
            value={this.state.billingAmount}
            validators={['required']}
            errorMessages={['billingAmount is required']}
            onChange={(e) => this.setState({ billingAmount: e.target.value })}
            margin="normal">
           </TextValidator>


           <TextValidator
            fullWidth 
            id="gst"
            label="GST amount"
            value={this.state.gst}
            validators={['required']}
            errorMessages={['gst is required']}
            onChange={(e) => this.setState({ gst: e.target.value })}
            margin="normal">
           </TextValidator>


           <TextValidator
            fullWidth 
            id="invoiceAmount"
            label="Invoice amount"
            value={this.state.invoiceAmount}
            validators={['required']}
            errorMessages={['invoiceAmount is required']}
            onChange={(e) => this.setState({ invoiceAmount: e.target.value })}
            margin="normal">
           </TextValidator>

           <TextValidator
            fullWidth 
            id="revenueAmount"
            label="Revenue amount"
            value={this.state.revenueAmount}
            validators={['required']}
            errorMessages={['revenueAmount is required']}
            onChange={(e) => this.setState({ revenueAmount: e.target.value })}
            margin="normal">
           </TextValidator>
           
       
          
      </Grid>

      <Grid item lg={4} className="paddingH">
      <Typography variant="h5" component="h3" > Order   </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker margin="normal" fullWidth label="Order book date" value={this.state.orderBookDate} />

          <TextValidator
            fullWidth 
            id="orderBookAmount"
            label="Order book amount"
            value={this.state.orderBookAmount}
            validators={['required']}
            errorMessages={['orderBookAmount is required']}
            onChange={(e) => this.setState({ orderBookAmount: e.target.value })}
            margin="normal">
           </TextValidator>

          <DatePicker fullWidth  margin="normal" label="Revenue realization date" value={this.state.revenueRealizationDate} />
        </MuiPickersUtilsProvider>
          
      </Grid>
      
      
      </Grid>




      </ValidatorForm> );
  }
};

