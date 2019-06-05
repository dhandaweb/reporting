import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import options from './../../options';
import Paper from '@material-ui/core/Paper';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';


export default class Personal extends React.Component {

  constructor(props) {
    super(props);

this.handleSubmit = this.handleSubmit.bind(this);

    this.titleList = options.titleList;
    this.genderList = options.genderList;
   
    this.ethnicityList = options.visaStatusList;
    this.citizenshipList = options.visaStatusList;
    this.workStatusList = options.visaStatusList;
    this.sourceList = options.sourceList;
   
    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;

    this.state = {
      title: this.props.personalDetails.title,
      firstName:this.props.personalDetails.firstName,
      lastName:this.props.personalDetails.lastName,
      gender:this.props.personalDetails.gender,

      ethnicity:this.props.personalDetails.ethnicity,
      citizenship:this.props.personalDetails.citizenship,
      workStatus:this.props.personalDetails.workStatus,
      source:this.props.personalDetails.source,

      currentEmployer:this.props.personalDetails.currentEmployer,
      primarySkill:this.props.personalDetails.primarySkill,
      salaryMin:this.props.personalDetails.salaryMin,
      salaryMax:this.props.personalDetails.salaryMax,
      workExpMin:this.props.personalDetails.workExpMin,
      workExpMax:this.props.personalDetails.workExpMax,

      address:this.props.personalDetails.address,
      city:this.props.personalDetails.city,
      state:this.props.personalDetails.state,
      country:this.props.personalDetails.country,
      
    };

    this.state.workExperienceRange = { min:this.state.workExpMin,  max:this.state.workExpMax };
    this.state.salaryRange = { min:this.state.salaryMin,  max:this.state.salaryMax }

    
  }

  handleSubmit = () => {

    this.props.personalDetails.title = this.state.title;
    this.props.personalDetails.firstName=this.state.firstName;
    this.props.personalDetails.lastName = this.state.lastName;
    this.props.personalDetails.gender =this.state.gender;

    this.props.personalDetails.ethnicity =this.state.ethnicity;
    this.props.personalDetails.citizenship=this.state.citizenship;
    this.props.personalDetails.workStatus=this.state.workStatus;
    this.props.personalDetails.source=this.state.source;

    this.props.personalDetails.currentEmployer=this.state.currentEmployer;
    this.props.personalDetails.primarySkill=this.state.primarySkill;
    this.props.personalDetails.salaryMin=this.state.salaryRange.min;
    this.props.personalDetails.salaryMax=this.state.salaryRange.max;
    this.props.personalDetails.workExpMax=this.state.workExperienceRange.min;
    this.props.personalDetails.workExpMax=this.state.workExperienceRange.max;

    this.props.personalDetails.address=this.state.address;
    this.props.personalDetails.city=this.state.city;
    this.props.personalDetails.state=this.state.state;
    this.props.personalDetails.country=this.state.country;

    this.props.nextHandle(1);
  }

  render() {

    return (
       <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
        <Grid container >

        <Grid item lg={3} className="paddingH">
         
            <Typography variant="h6"> Personal   </Typography>
           
            <TextValidator
            fullWidth 
            id="title"
            select
            label="Title"
            value={this.state.title}
            validators={['required']}
            errorMessages={['title is required']}
         
            onChange={(e) => this.setState({ title: e.target.value })}
            margin="normal">
                  {this.titleList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
           </TextValidator>

            <TextValidator
              fullWidth
              id="firstName"
              label="First name"
              margin="normal"
              name="firstName"
              onChange={(e) => this.setState({ firstName: e.target.value })}
              value={this.state.firstName}
              validators={['required']}
              errorMessages={['First name is required']}
            />

          <TextValidator
           fullWidth
              id="lastName"
              label="Last name"
              margin="normal"
              name="lastName"
              onChange={(e) => this.setState({ lastName: e.target.value })}
              value={this.state.lastName}
              validators={['required']}
              errorMessages={['Last name is required']}
            />
            
            <TextField 
            fullWidth 
            id="gender"
            onChange={(e) => this.setState({ gender: e.target.value })}
            select label="Gender"
            value={this.state.gender} 
            margin="normal">
              {this.genderList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
         
        </Grid>
       
        <Grid item lg={3} className="paddingH">
         
         <Typography variant="h6"> Address   </Typography>
           
         <TextValidator
            fullWidth 
            id="address"
            label="Address"
            value={this.state.address}
            validators={['required']}
            errorMessages={['Address is required']}
            onChange={(e) => this.setState({ address: e.target.value })}
            margin="normal">
           </TextValidator>
        
        <TextValidator
         fullWidth 
         id="city"
         select
         label="City"
         value={this.state.city}
         validators={['required']}
         errorMessages={['citizenship is required']}
         onChange={(e) => this.setState({ city: e.target.value })}
         margin="normal">
               {this.cities.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>

        <TextValidator
         fullWidth 
         id="state"
         select
         label="State"
         value={this.state.state}
         validators={['required']}
         errorMessages={['State is required']}
       
         onChange={(e) => this.setState({ state: e.target.value })}
         margin="normal">
               {this.states.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>

        <TextValidator
         fullWidth 
         id="country"
         select
         label="Country"
         value={this.state.country}
         validators={['required']}
         errorMessages={['country is required']}
         onChange={(e) => this.setState({ country: e.target.value })}
         margin="normal">
               {this.countries.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>
       
        </Grid>

        <Grid item lg={3} className="paddingH">
         
         <Typography variant="h6"> Current suitation   </Typography>
           
         <TextValidator
            fullWidth
              id="currentEmployer"
              label="Current employer"
              margin="normal"
              name="currentEmployer"
              onChange={(e) => this.setState({ currentEmployer: e.target.value })}
              value={this.state.currentEmployer}
            />

          <TextValidator
            fullWidth
              id="primarySkill"
              label="Primary skill"
              margin="normal"
              name="primarySkill"
              onChange={(e) => this.setState({ primarySkill: e.target.value })}
              value={this.state.primarySkill}
            />

          <div  className="paddingT"><InputRange
              maxValue={20}
              step={1}
              minValue={0}
              formatLabel={value => `${value} Years`}
              value={this.state.workExperienceRange}
              onChange={value => this.setState({ workExperienceRange: value })}
              onChangeComplete={value => console.log(value)} />
            </div>
        
      
            <div  className="paddingT"><InputRange
              maxValue={120000}
              step={5000}
              minValue={40000}
              formatLabel={value => `${value} AUD`}
              value={this.state.salaryRange}
              onChange={value => this.setState({ salaryRange: value })}
              onChangeComplete={value => console.log(value)} />
            </div>

     </Grid>

        <Grid item lg={3} className="paddingH">
         
         <Typography variant="h6"> Background   </Typography>
           
        <TextValidator
         fullWidth 
         id="ethnicity"
         select
         label="Ethnicity"
         value={this.state.ethnicity}
         validators={['required']}
         errorMessages={['ethnicity is required']}
        
         onChange={(e) => this.setState({ ethnicity: e.target.value })}
         margin="normal">
               {this.ethnicityList.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>
        
        <TextValidator
         fullWidth 
         id="citizenship"
         select
         label="Citizenship"
         value={this.state.citizenship}
         validators={['required']}
         errorMessages={['citizenship is required']}
       
         onChange={(e) => this.setState({ citizenship: e.target.value })}
         margin="normal">
               {this.citizenshipList.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>
      

        <TextValidator
         fullWidth 
         id="workStatus"
         select
         label="Work status"
         value={this.state.workStatus}
         validators={['required']}
         errorMessages={['Work status is required']}
       
         onChange={(e) => this.setState({ workStatus: e.target.value })}
         margin="normal">
               {this.workStatusList.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>

        <TextValidator
         fullWidth 
         id="source"
         select
         label="Source"
         value={this.state.source}
         validators={['required']}
         errorMessages={['sources is required']}
        
         onChange={(e) => this.setState({ source: e.target.value })}
         margin="normal">
               {this.sourceList.map(option => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
        </TextValidator>

     </Grid>
     <Grid container spacing={24} >
      <Divider />
          <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" > Next</Button>
          </Grid>
      </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
};

