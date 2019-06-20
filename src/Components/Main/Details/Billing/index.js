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
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';

export default class Billing extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.jobTypeList = options.jobTypeList;
    this.jobCategoryList = options.jobCategoryList;

    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;
    this.pipelineTypeList = options.pipelineTypeList;
    this.invoiceTypeList = options.invoiceTypeList;
    
    this.state = {
      pipelineType:this.props.billingDetails.pipelineType,
      invoiceType:this.props.billingDetails.invoiceType,
      invoiceNo:this.props.billingDetails.invoiceNo,
      billingAmount:this.props.billingDetails.billingAmount,
      gst:this.props.billingDetails.gst,
      invoiceAmount:this.props.billingDetails.invoiceAmount,
      orderBookAmount:this.props.billingDetails.orderBookAmount,
      orderBookDate:this.props.billingDetails.orderBookDate,
      revenueRealizationDate:this.props.billingDetails.revenueRealizationDate, 
      revenueAmount:this.props.billingDetails.revenueAmount,
    };
  }
  handleSubmit = () => {

    this.props.billingDetails.pipelineType = this.state.pipelineType;
    this.props.billingDetails.invoiceType = this.state.invoiceType;
    this.props.billingDetails.invoiceNo = this.state.invoiceNo;
    this.props.billingDetails.billingAmount = this.state.billingAmount;
    this.props.billingDetails.gst = this.state.gst;
    this.props.billingDetails.invoiceAmount = this.state.invoiceAmount;
    this.props.billingDetails.orderBookAmount = this.state.orderBookAmount;
    this.props.billingDetails.orderBookDate = this.state.orderBookDate;
    this.props.billingDetails.revenueRealizationDate = this.state.revenueRealizationDate;
    this.props.billingDetails.revenueAmount = this.state.revenueAmount;
   
    this.props.submitForm();

  }
  handleBack(){
    this.props.nextHandle(2);
  }


  render() {
   

    return (<ValidatorForm
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
            label="Pipeline type"
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
              errorMessages={['Invoice No is required']}
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
              validators={['required','isNumber']}
              errorMessages={['Billing amount is required','Should be number']}
              onChange={(e) => this.setState({ billingAmount: e.target.value })}
              margin="normal">
            </TextValidator>


            <TextValidator
              fullWidth 
              id="gst"
              label="GST amount"
              value={this.state.gst}
              validators={['required','isNumber']}
              errorMessages={['GST is required','Should be number']}
              onChange={(e) => this.setState({ gst: e.target.value })}
              margin="normal">
            </TextValidator>


            <TextValidator
              fullWidth 
              id="invoiceAmount"
              label="Invoice amount"
              value={this.state.invoiceAmount}
              validators={['required','isNumber']}
              errorMessages={['Invoice amount is required','Should be number']}
              onChange={(e) => this.setState({ invoiceAmount: e.target.value })}
              margin="normal">
            </TextValidator>

            <TextValidator
              fullWidth 
              id="revenueAmount"
              label="Revenue amount"
              value={this.state.revenueAmount}
              validators={['required','isNumber']}
              errorMessages={['Revenue amount is required','Should be number']}
              onChange={(e) => this.setState({ revenueAmount: e.target.value })}
              margin="normal">
            </TextValidator>
            
        
            
        </Grid>

        <Grid item lg={4} className="paddingH">
        <Typography variant="h5" component="h3" > Order   </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker margin="normal" fullWidth label="Order book date" 
            onChange={(e) => this.setState({ orderBookDate: e })}
            value={this.state.orderBookDate} />

            <TextValidator
              fullWidth 
              id="orderBookAmount"
              label="Order book amount"
              value={this.state.orderBookAmount}
              validators={['required']}
              errorMessages={['Order book amount is required']}
              onChange={(e) => this.setState({ orderBookAmount: e.target.value })}
              margin="normal">
            </TextValidator>

            <DatePicker
            fullWidth 
              margin="normal"
              label="Revenue realization date"
                value={this.state.revenueRealizationDate}
                onChange={(e) => this.setState({ revenueRealizationDate: e })}
                />
          </MuiPickersUtilsProvider>
            
        </Grid>

        <Grid container spacing={24} >
              <Grid item xs={12} style={{textAlign:"center", padding:10}}>
                  <Divider style={{margin:10}}/>
                  <Button onClick={this.handleBack}> Back  </Button>
                <Button variant="contained" color="primary" type="submit"> Save</Button>
              </Grid>
      </Grid>
      </Grid> 

      </ValidatorForm> );
  }
};

