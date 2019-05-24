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




export default class Details extends React.Component {
 
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.state = {
      expanded: 'Jobcycle',
      activeStep: 0,
    };

    this.steps =['Personal details', 'Job & Client details', 'Recruitment details',"Billing details"];
  }
 
 
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
 
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
 
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


 
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Personal/>;
      case 1:
        return <JobDetails/>;
      case 2:
        return <Recruitment/>;
      case 3:
        return <Billing/>;
        
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
      

        
      <Grid container spacing={24} >
      <Divider />
          <Grid item xs={12}>
              <Button disabled={this.state.activeStep === 0} onClick={this.handleBack}> Back  </Button>
              <Button variant="contained" color="primary" onClick={this.handleNext}> {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Grid>
      </Grid>
         
        </div>
     
    );

  }
};