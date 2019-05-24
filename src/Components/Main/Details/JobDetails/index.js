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

export default class JobDetails extends React.Component {
 
  constructor(props) {
    super(props);
   

    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;

    this.jobTypeList = options.jobTypeList;
    this.jobCategoryList = options.jobCategoryList;
    this.offerStatusList = options.offerStatusList;
    

    this.state = {
     
      
      client:"",
      jobTitle:"",
      jobType:"",
      jobCategory:"",
      hiringManager:"",
      
      jobAddress:"",
      jobCity:"",
      jobState:"",
      jobCountry:"",

      offerStatus:"",
      jobOpenedDate:new Date(),
      cvSubmissionDate:new Date(),
      offerDate:new Date(),
      joiningDate:new Date(),
    };
  }

  handleSubmit = () => {
   
  }


  render() {

  



    return ( 
    <ValidatorForm
      ref="form"
      onSubmit={this.handleSubmit}
      onError={errors => console.log(errors)}
    >
   <Grid container >

        <Grid item lg={4} className="paddingH">
          
              <Typography variant="h5" component="h3" > Client details   </Typography>

              <TextValidator
                fullWidth
                id="client"
                label="Client"
                margin="normal"
                name="client"
                onChange={(e) => this.setState({ client: e.target.value })}
                value={this.state.client}
                validators={['required']}
                errorMessages={['Client is required']}
              />

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
                        {this.jobTypeList.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
              </TextValidator>
            
          
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
                        {this.jobCategoryList.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
              </TextValidator>

          </Grid>

        <Grid item lg={4} className="paddingH">
          
          <Typography variant="h5" component="h3" > Job Address   </Typography>
            
          <TextValidator
              fullWidth 
              id="jobAddress"
              label="Job address"
              value={this.state.jobAddress}
              validators={['required']}
              errorMessages={['Job address is required']}
              onChange={(e) => this.setState({ jobAddress: e.target.value })}
              margin="normal">
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
                {this.cities.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
        
          onChange={(e) => this.setState({ jobState: e.target.value })}
          margin="normal">
                {this.states.map(option => (
                  <MenuItem key={option.value} value={option.value}>
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
          onChange={(e) => this.setState({ jobCountry: e.target.value })}
          margin="normal">
                {this.countries.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextValidator>
        
          </Grid>
        
          <Grid item lg={4} className="paddingH">
          
          <Typography variant="h5" component="h3" > Job dates   </Typography>
            
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
                {this.offerStatusList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextValidator>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <DatePicker fullWidth margin="normal" label="Job opened date" value={this.state.jobOpenedDate} />
             <DatePicker fullWidth margin="normal" label="Cv submission date" value={this.state.cvSubmissionDate} />
             <DatePicker fullWidth margin="normal" label="Offer date" value={this.state.offerDate} />
             <DatePicker fullWidth margin="normal" label="Joining date" value={this.state.joiningDate} />
          </MuiPickersUtilsProvider>
        
          </Grid>

    </Grid>

     </ValidatorForm> );
  }
};

