import React from 'react';

import { connect } from "react-redux";
import { setSnackBar } from "../../../Redux/Actions";

import Personal from './Personal';
import Recruitment from './Recruitment';
import JobDetails from './JobDetails';
import Billing from './Billing';


import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import env from '../../../environment.json';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export class Details extends React.Component {

  constructor(props) {
    super(props);

    this.getStepContent = this.getStepContent.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    

    this.isEditing = false;
    this.state = {
      activeStep: 0,
      recordAddedSucessfullly: false
    };

    this.steps = ['Personal details', 'Job & Client details', 'Recruitment details', "Billing details"];

    this.state.details = {
      title: "",
      firstName: "",
      lastName: "",
      gender: "",

      ethnicity: "",
      citizenship: "",
      workStatus: "",
      source: "",

      currentEmployer: "",
      primarySkill: "",
      salaryMin: 20000,
      salaryMax: 60000,
      workExpMin: 1,
      workExpMax: 4,

      address: "",
      city: "Melbourne",
      state: "Victoria",
      country: "Australia",

      client: "",
      hiringManager: "",
      jobTitle: "",
      jobType: "",
      jobCategory: "",


      jobAddress: "",
      jobCity: "Melbourne",
      jobState: "Victoria",
      jobCountry: "Australia",

      offerStatus: "",
      jobOpenedDate: new Date(),
      cvSubmissionDate: new Date(),
      offerDate: new Date(),
      joiningDate: new Date(),

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

      pipelineType: "",
      invoiceType: "",
      invoiceNo: "",
      billingAmount: '',
      gst: '',
      invoiceAmount: '',
      orderBookAmount: '',
      orderBookDate: new Date(),
      revenueRealizationDate: new Date(),
      revenueAmount: '',

      createdDate: new Date(),
      updatedDate: new Date(),
      userId: localStorage.getItem('userId'),
      userGroupId: localStorage.getItem('userGroupId')
      
    }

    if (this.props.location !== undefined) {
      if (this.props.location.state) {
        this.state.details = this.props.location.state.details;
        this.isEditing = true;
      }
    };

  }

  resetForm(){

    var details = {
      title: "",
      firstName: "",
      lastName: "",
      gender: "",

      ethnicity: "",
      citizenship: "",
      workStatus: "",
      source: "",

      currentEmployer: "",
      primarySkill: "",
      salaryMin: 0,
      salaryMax: 60000,
      workExpMin: 0,
      workExpMax: 1,

      address: "",
      city: "",
      state: "",
      country: "",

      client: "",
      hiringManager: "",
      jobTitle: "",
      jobType: "",
      jobCategory: "",


      jobAddress: "",
      jobCity: "",
      jobState: "",
      jobCountry: "",

      offerStatus: "",
      jobOpenedDate: new Date(),
      cvSubmissionDate: new Date(),
      offerDate: new Date(),
      joiningDate: new Date(),

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

      pipelineType: "",
      invoiceType: "",
      invoiceNo: "",
      billingAmount: '',
      gst: '',
      invoiceAmount: '',
      orderBookAmount: '',
      orderBookDate: new Date(),
      revenueRealizationDate: new Date(),
      revenueAmount: '',

      createdDate: new Date(),
      updatedDate: new Date(),
      UserId: localStorage.getItem('UserId'),
      UserGroup: localStorage.getItem('UserGroup')
    }

    this.setState({
      details: details,
    });

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

  submitForm() {
    if (this.isEditing === false) {
      axios({
        method: 'post',
        url: env.endPointUrl + 'addDetails',
        data: this.state.details
      })
        .then(response => {
          this.setState({recordAddedSucessfullly:true})
          this.props.setSnackBar({ show: true, message: "New record added sucessfully." });
          this.handleReset();
          this.resetForm();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      axios({
        method: 'post',
        url: env.endPointUrl + 'updateDetails',
        data: this.state.details
      })
        .then(response => {
          this.setState({recordAddedSucessfullly:true})
          this.props.setSnackBar({ show: true, message: "Record updated sucessfully." });
        })
        .catch(function (error) {
          console.log(error);
        });

    }

  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Personal nextHandle={this.handleNext} personalDetails={this.state.details} />;
      case 1:
        return <JobDetails nextHandle={this.handleNext} jobDetails={this.state.details} />;
      case 2:
        return <Recruitment nextHandle={this.handleNext} recruitmentDetails={this.state.details} />;
      case 3:
        return <Billing nextHandle={this.handleNext} billingDetails={this.state.details} submitForm={this.submitForm} />;

      default:
        return 'Unknown stepIndex';
    }
  }


  render() {

    return (

      <div>
        <Grid container spacing={24} className="mainContent">
          <div className="subHeading">
            <AddIcon className="dashboard" />
            <Typography className="title" variant="subtitle1" noWrap> Add candidate</Typography>
          </div>

          {this.state.recordAddedSucessfullly && 
            <div className="success"><Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
              Record {this.isEditing ? "updated" : "added"} successfully.
              </Typography>
             
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" component={Link} to="/list" >Candidate list</Button>
              <Button size="small" variant="contained" color="secondary" onClick={()=>{ this.resetForm(); this.setState({recordAddedSucessfullly:false})}} >Add Candidate</Button>
            </CardActions>
          </Card></div>
          }
          { !this.state.recordAddedSucessfullly &&
          <div style={{ padding: 15, width:'100%' }}>
            <Stepper activeStep={this.state.activeStep} alternativeLabel >
              {this.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Divider />
            <div style={{ padding: 10, background: "#fff" }}>
              {this.getStepContent(this.state.activeStep)}
            </div>
          </div>
          }



        </Grid>
      </div>

    );

  }
};

const mapStateToProps = state => {
  return { snackBar: state.snackBar };
};

const mapDispatchToProps = dispatch => {
  return {
    setSnackBar: (obj) => dispatch(setSnackBar(obj))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Details);