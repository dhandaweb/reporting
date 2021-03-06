import React from 'react';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';


import axios from 'axios';
import env from '../../../../environment.json';
import options from './../../options';
import csc from 'country-state-city';

export default class JobDetails extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.updateHiringManagerList = this.updateHiringManagerList.bind(this);

    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;

    this.jobTypeList = options.jobTypeList;
    this.jobCategoryList = options.jobCategoryList;


    this.state = {
      countriesRaw: csc.getAllCountries(),
      countries: csc.getAllCountries().map(d => d.name),
      statesRaw: csc.getStatesOfCountry('13'),
      states: csc.getStatesOfCountry('13').map(d => d.name),
      cities: csc.getCitiesOfState('273').map(d => d.name),
      client: this.props.jobDetails.client,
      jobTitle: this.props.jobDetails.jobTitle,
      jobType: this.props.jobDetails.jobType,
      jobCategory: this.props.jobDetails.jobCategory,
      hiringManager: this.props.jobDetails.hiringManager,

      jobAddress: this.props.jobDetails.jobAddress,
      jobCity: this.props.jobDetails.jobCity,
      jobState: this.props.jobDetails.jobState,
      jobCountry: this.props.jobDetails.jobCountry,

      offerStatus: this.props.jobDetails.offerStatus,
      jobOpenedDate: this.props.jobDetails.jobOpenedDate,
      cvSubmissionDate: this.props.jobDetails.cvSubmissionDate,
      offerDate: this.props.jobDetails.offerDate,
      joiningDate: this.props.jobDetails.joiningDate,
      offerStatusList: [{ id: 0, label: "list not loaded" }],
      jobCategoryList: [{ id: 0, label: "list not loaded" }],
      jobTypeList: [{ id: 0, label: "list not loaded" }],
      list: ["offerStatusList","jobCategoryList","jobTypeList"],
      clientList:[{ id: 0, name: "list not loaded" }],
      hiringManagerList:[{ id: 0, name: "Please select client first." }]
    };

    
   
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
          if (i == this.state.list.length - 1){
            if(this.props.jobDetails.client.length > 0) this.updateHiringManagerList(this.props.jobDetails.client);
          } 

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
     this.getClientList();
  }

  getClientList() {
    axios({
      method: 'post',
      url: env.endPointUrl + 'getClientList',
      data: {
        userGroupId: localStorage.getItem('userGroupId'),
      }
    })
      .then(response => {
        this.setState({ clientList: response.data });
        
        this.getOption(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = () => {

    this.props.jobDetails.client = this.state.client;
    this.props.jobDetails.jobTitle = this.state.jobTitle;
    this.props.jobDetails.jobType = this.state.jobType;
    this.props.jobDetails.jobCategory = this.state.jobCategory;
    this.props.jobDetails.hiringManager = this.state.hiringManager;

    this.props.jobDetails.jobAddress = this.state.jobAddress;
    this.props.jobDetails.jobCity = this.state.jobCity;
    this.props.jobDetails.jobState = this.state.jobState;
    this.props.jobDetails.jobCountry = this.state.jobCountry;

    this.props.jobDetails.offerStatus = this.state.offerStatus;
    this.props.jobDetails.jobOpenedDate = this.state.jobOpenedDate;
    this.props.jobDetails.cvSubmissionDate = this.state.cvSubmissionDate;
    this.props.jobDetails.offerDate = this.state.offerDate;
    this.props.jobDetails.joiningDate = this.state.joiningDate;

    this.props.nextHandle(2);
  }

  handleBack() {
    this.props.nextHandle(0);
  }

  updateHiringManagerList(val){
  
        axios({
              method: 'post',
              url: env.endPointUrl + 'getHiringManagerList',
              data: { client: this.state.clientList.filter(d=>d.name === val)[0].id }
            })
              .then(response => {
                this.setState({ 
                  client: val,
                  hiringManagerList:response.data  });
              })
              .catch(function (error) {
                console.log(error);
              });
  };

  render() {

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Grid container >

          <Grid item lg={4} sm={12} className="paddingH">

            <TextValidator
              fullWidth
              id="client"
              select
              label="Client"
              margin="normal"
              name="client"
              onChange={(e) => {
                this.updateHiringManagerList(e.target.value);
               }}
              value={this.state.client}
              validators={['required']}
              errorMessages={['Client is required']}
               > {this.state.clientList.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              fullWidth
              select
              id="hiringManager"
              label="Hiring Manager"
              margin="normal"
              name="hiringManager"
              onChange={(e) => this.setState({ hiringManager: e.target.value })}
              value={this.state.hiringManager}
              validators={['required']}
              errorMessages={['Hiring manager is required']}
             > {this.state.hiringManagerList.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              fullWidth
              id="jobTitle"
              label="Job title"
              margin="normal"
              name="jobTitle"
              onChange={(e) => this.setState({ jobTitle: e.target.value })}
              value={this.state.jobTitle}
              validators={['required']}
              errorMessages={['Job title is required']}
            />

            <TextValidator
              fullWidth
              id="jobType"
              select
              label="Job type"
              value={this.state.jobType}
              validators={['required']}
              errorMessages={['Job type is required']}
              onChange={(e) => this.setState({ jobType: e.target.value })}
              margin="normal">
              {this.state.jobTypeList.map(option => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>


           

          </Grid>

          <Grid item lg={4} sm={12} className="paddingH">

            {/* <TextValidator
              fullWidth
              id="jobAddress"
              label="Job address"
              value={this.state.jobAddress}
              validators={['required']}
              errorMessages={['Job address is required']}
              onChange={(e) => this.setState({ jobAddress: e.target.value })}
              margin="normal">
            </TextValidator> */}

               <TextValidator
              fullWidth
              id="jobCategory"
              select
              label="Job Category"
              value={this.state.jobCategory}
              validators={['required']}
              errorMessages={['Job category is required']}
              onChange={(e) => this.setState({ jobCategory: e.target.value })}
              margin="normal">
              {this.state.jobCategoryList.map(option => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              fullWidth
              id="jobCountry"
              select
              label="Job Country"
              value={this.state.jobCountry}
              validators={['required']}
              errorMessages={['Job country is required']}
              onChange={(e) =>{ 
                var statesRaw = csc.getStatesOfCountry(this.state.countriesRaw.filter(d=>d.name === e.target.value)[0].id);
           
                this.setState({
                  jobCountry:e.target.value,
                   states:statesRaw.map(d=>d.name),
                   statesRaw:statesRaw,
                   jobState:statesRaw.map(d=>d.name)[0]
                });
                }
              }
              margin="normal">
              {this.state.countries.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              fullWidth
              id="jobState"
              select
              label="Job state"
              value={this.state.jobState}
              validators={['required']}
              errorMessages={['Job state is required']}

              onChange={(e) => {

                var citiesRaw = csc.getCitiesOfState(this.state.statesRaw.filter(d=>d.name === e.target.value)[0].id);
                var cities = citiesRaw.map(d=>d.name);
    
                this.setState({
                   jobState:e.target.value,
                   cities: cities,
                   jobCity:cities[0]
                   })
              }}
              margin="normal">
              {this.state.states.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>


            <TextValidator
              fullWidth
              id="jobCity"
              select
              label="Job city"
              value={this.state.jobCity}
              validators={['required']}
              errorMessages={['job city is required']}
              onChange={(e) => this.setState({ jobCity: e.target.value })}
              margin="normal">
              {this.state.cities.map((option,i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>
           

          </Grid>

          <Grid item lg={4} sm={12} className="paddingH">

            <TextValidator
              fullWidth
              id="offerStatus"
              select
              label="Offer status"
              value={this.state.offerStatus}
              validators={['required']}
              errorMessages={['Offer status is required']}
              onChange={(e) => this.setState({ offerStatus: e.target.value })}
              margin="normal">
              {this.state.offerStatusList.map(option => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker fullWidth margin="normal" label="Job opened date" value={this.state.jobOpenedDate} onChange={(e) => this.setState({ jobOpenedDate: e })} />
              <DatePicker fullWidth margin="normal" label="Cv submission date" value={this.state.cvSubmissionDate} onChange={(e) => this.setState({ cvSubmissionDate: e })} />
              <DatePicker fullWidth margin="normal" label="Offer date" value={this.state.offerDate} onChange={(e) => this.setState({ offerDate: e })} />
              <DatePicker fullWidth margin="normal" label="Joining date" value={this.state.joiningDate} onChange={(e) => this.setState({ joiningDate: e })} />
            </MuiPickersUtilsProvider>

          </Grid>

          <Grid item lg={12} style={{ textAlign: "center", padding: 10 }} >
            <Divider style={{ margin: 10 }} />
            <Button onClick={this.handleBack}> Back  </Button>
            <Button variant="contained" color="primary" type="submit" > Next</Button>
          </Grid>

        </Grid>

      </ValidatorForm>);
  }
};

