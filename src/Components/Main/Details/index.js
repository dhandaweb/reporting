import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Personal from './Personal';
import Recruitment from './Recruitment';
import JobDetails from './JobDetails';
import Billing from './Billing';



import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';


export default class Details extends React.Component {
 
  constructor(props) {
    super(props);
    
    this.getStepContent = this.getStepContent.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      activeStep:0,
    };

    this.steps =['Personal details', 'Job & Client details', 'Recruitment details',"Billing details"];

    this.state.details = {
      title: "",
      firstName:"",
      lastName:"",
      gender:"",

      ethnicity:"",
      citizenship:"",
      workStatus:"",
      source:"",

      currentEmployer:"",
      primarySkill:"",
      salaryMin:"",
      salaryMax:"",
      workExpMin:"",
      workExpMax:"",

      address:"",
      city:"",
      state:"",
      country:"",
    
      client:"",
      hiringManager:"",
      jobTitle:"",
      jobType:"",
      jobCategory:"",
     
      
      jobAddress:"",
      jobCity:"",
      jobState:"",
      jobCountry:"",

      offerStatus:"",
      jobOpenedDate:new Date(),
      cvSubmissionDate:new Date(),
      offerDate:new Date(),
      joiningDate:new Date(),
    
      recruiter: "",
      cre: "",
      accountManager: "",
      accountDirector: "",

      countryManager: "",
      team: "",
      geo: "",

      commissionAmount: "",
      commissionStatus: "",
      commissionDate: new Date(),
      netRevenue: '',
    
      pipelineType:"",
      invoiceType:"",
      invoiceNo:"",
      billingAmount:'',
      gst:'',
      invoiceAmount:'',
      orderBookAmount:'',
      orderBookDate:new Date(),
      revenueRealizationDate:new Date(), 
      revenueAmount:0,

      createdDate:new Date(),
      updatedDate:new Date(), 
      UserId:localStorage.getItem('UserId'),
      UserGroup:localStorage.getItem('UserGroup')
    }



  }
 
 
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
 
  
  handleNext = (activeStep) => {
 
    this.setState(state => ({
      activeStep: activeStep,
    }));
 
    
  };

  handleBack = (activeStep) => {
    this.setState(state => ({
      activeStep: activeStep,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  submitForm(){

    axios({
      method:'post',
      url:'http://localhost:8080/api/addDetails',
      data: this.state.details
    })
    .then(response => {
        //this.props.history.push('/list');
    })
    .catch(function (error) {
    console.log(error);
    });


  }
 
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Personal nextHandle = {this.handleNext} personalDetails = {this.state.details}/>;
      case 1:
        return <JobDetails  nextHandle = {this.handleNext} jobDetails = {this.state.details}/>;
      case 2:
        return <Recruitment nextHandle = {this.handleNext} recruitmentDetails = {this.state.details}/>;
      case 3:
        return <Billing  nextHandle = {this.handleNext} billingDetails = {this.state.details} submitForm={this.submitForm}/>;
        
      default:
        return 'Unknown stepIndex';
    }
  }


  render() {

    return (
      <div style={{ padding: 20 }}>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {this.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider />
        {this.getStepContent(this.state.activeStep)}
      

        
      
         
        </div>
     
    );

  }
};