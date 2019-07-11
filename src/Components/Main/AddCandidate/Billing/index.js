import React from 'react';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import env from '../../../../environment.json';

export default class Billing extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);

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
      netRevenue: this.props.billingDetails.netRevenue,

      invoiceTypeList:[{id:0,label:"list not loaded"}],
      pipelineTypeList:[{id:0,label:"list not loaded"}],
      list:["invoiceTypeList","pipelineTypeList"]
    };
    
    this.getOption(0);
  }

  getOption(i) {

    if (this.state.list[i] !== undefined) {
      axios({
        method: 'post',
        url: env.endPointUrl + 'getOption',
        data: { tableName: this.state.list[i] }
      })
        .then(response => {
          var obj = {};
          obj[this.state.list[i]] = response.data;
          this.setState(obj);
          if (i < this.state.list.length - 1) this.getOption(i + 1);

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

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
    this.props.billingDetails.netRevenue = this.state.netRevenue;
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
        <Grid item lg={4} sm={12} className="paddingH">
      
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
                  {this.state.pipelineTypeList.map(option => (
                    <MenuItem key={option.id} value={option.label}>
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
                  {this.state.invoiceTypeList.map(option => (
                    <MenuItem key={option.id} value={option.label}>
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
        
        <Grid item lg={4} sm={12} className="paddingH">
        <TextValidator
              fullWidth 
              id="billingAmount"
              label="Billing amount"
              value={this.state.billingAmount}
              validators={['required','isFloat']}
              errorMessages={['Billing amount is required','Invalid Amount']}
              onChange={(e) => {
               var n=0,b=0;
                if(e.target.value.length > 0){
                   n = parseFloat(e.target.value);
                   b = parseFloat(e.target.value * .1);
                }
              
                this.setState({ billingAmount: e.target.value,
                  gst: b,
                  invoiceAmount :n+ b,
                  orderBookAmount:n+ b,
                  revenueAmount:n+ b,
                  netRevenue: (n+ b) - parseFloat(this.props.billingDetails.commissionAmount)
                })
              }}
              margin="normal">
            </TextValidator>


            <TextValidator
              fullWidth
              disabled 
              id="gst"
              label="GST amount"
              value={this.state.gst}
              validators={['required','isFloat']}
              errorMessages={['GST is required','Invalid Amount']}
              // onChange={(e) => this.setState({ gst: e.target.value })}
              margin="normal">
            </TextValidator>


            <TextValidator
              fullWidth
              disabled 
              id="invoiceAmount"
              label="Invoice amount"
              value={this.state.invoiceAmount}
              validators={['required','isFloat']}
              errorMessages={['Invoice amount is required','Invalid Amount']}
              // onChange={(e) => this.setState({ invoiceAmount: e.target.value })}
              margin="normal">
            </TextValidator>

            <TextValidator
              fullWidth 
              disabled
              id="revenueAmount"
              label="Revenue amount"
              value={this.state.revenueAmount}
              validators={['required','isFloat']}
              errorMessages={['Revenue amount is required','Invalid Amount']}
              // onChange={(e) => this.setState({ revenueAmount: e.target.value })}
              margin="normal">
            </TextValidator>
            
        </Grid>

        <Grid item lg={4} sm={12} className="paddingH">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker margin="normal" fullWidth label="Order book date" 
            onChange={(e) => this.setState({ orderBookDate: e })}
            value={this.state.orderBookDate} />
            <DatePicker
            fullWidth 
              margin="normal"
              label="Revenue realization date"
                value={this.state.revenueRealizationDate}
                onChange={(e) => this.setState({ revenueRealizationDate: e })}
                />
          </MuiPickersUtilsProvider>

          <TextValidator
              fullWidth 
              disabled
              id="orderBookAmount"
              label="Order book amount"
              value={this.state.orderBookAmount}
              validators={['required','isFloat']}
              errorMessages={['Revenue amount is required','Invalid Amount']}
              // onChange={(e) => this.setState({ orderBookAmount: e.target.value })}
              margin="normal">
            </TextValidator>

            <TextValidator
                id="netRevenue"
                fullWidth
                disabled
                label="Net revenue"
                validators={['required','isFloat']}
                errorMessages={['Net revenue is required','Invalid Amount']}
                // onChange={(e) => this.setState({ netRevenue: e.target.value })}
                value={this.state.netRevenue}
                margin="normal" >
          </TextValidator>

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

