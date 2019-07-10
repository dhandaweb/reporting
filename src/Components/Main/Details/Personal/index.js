import React from 'react';

import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import env from '../../../../environment.json';
import options from './../../options';
import * as d3 from "d3";
import csc from 'country-state-city';

export default class Personal extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.titleList = options.titleList;
    this.genderList = options.genderList;
   
    this.getOption = this.getOption.bind(this);
    this.sourceList = options.sourceList;

    this.state = {
      maxSalary:180000,
      maxWorkExp:15,
      countriesRaw: csc.getAllCountries(),
      countries: csc.getAllCountries().map(d=>d.name),
      statesRaw: csc.getStatesOfCountry('13'),
      states:csc.getStatesOfCountry('13').map(d=>d.name),
      cities:csc.getCitiesOfState('273').map(d=>d.name),
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
      

      ethnicityList:[{id:0,label:"list not loaded"}],
      citizenshipList:[{id:0,label:"list not loaded"}],
      workStatusList:[{id:0,label:"list not loaded"}],
      list:["ethnicityList","citizenshipList","workStatusList"]

    };

    this.state.workExperienceRange = { min:this.state.workExpMin,  max:this.state.workExpMax };
    this.state.salaryRange = { min:this.state.salaryMin,  max:this.state.salaryMax }

    this.getOption(0);
    this.format = d3.format(".2s");


  }


  getOption(i) {
      
    if(this.state.list[i] !== undefined){
    axios({
      method: 'post',
      url: env.endPointUrl + 'getOption',
      data: { tableName: this.state.list[i] }
    })
      .then(response => {
        var obj = {};
        obj[this.state.list[i]] = response.data;
          this.setState(obj);
          if(i < this.state.list.length-1) this.getOption(i+1);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
    this.props.personalDetails.workExpMin=this.state.workExperienceRange.min;
    this.props.personalDetails.workExpMax=this.state.workExperienceRange.max;

    this.props.personalDetails.address=this.state.address;
    this.props.personalDetails.city=this.state.city;
    this.props.personalDetails.state=this.state.state;
    this.props.personalDetails.country=this.state.country;

    this.props.nextHandle(1);
  }
  componentDidMount(){
   

}
  render() {

    return (
       <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
        <Grid container >
      
          <Grid item lg={3} sm={12} className="paddingH">
          
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
        
         
          <Grid item lg={3} sm={12} className="paddingH">
            
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

            <div className="paddingT">
            <p className="rangeLabel">Work Experience </p>
              <InputRange
                maxValue={this.state.maxWorkExp}
                step={1}
                minValue={0}
                formatLabel={value => `${value}yrs`}
                value={this.state.workExperienceRange}
                onChange={value => {
                  if(value.max === this.state.maxWorkExp && this.state.maxWorkExp < 46) this.setState({ maxWorkExp: this.state.maxWorkExp + 5 });
                  this.setState({ workExperienceRange: value })
                }}
                onChangeComplete={value => console.log(value)} />
              </div>
          
              
              <div className="paddingT">
              <p className="rangeLabel">Salary range </p>
                <InputRange
                maxValue={this.state.maxSalary}
                step={1000}
                minValue={0}
                formatLabel={value => `$${this.format(value)}`}
                value={this.state.salaryRange}
                onChange={value => {
                
                  if(value.max === this.state.maxSalary && this.state.maxSalary < 1000001) this.setState({ maxSalary: this.state.maxSalary + 50000 });
                  this.setState({ salaryRange: value });
                }}
                onChangeComplete={value => console.log(value)} />
              </div>

      </Grid>

          <Grid item lg={3} sm={12} className="paddingH">
          
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
                {this.state.ethnicityList.length > 0 &&
                this.state.ethnicityList.map(option => (
                  <MenuItem key={option.id} value={option.label}>
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
                {this.state.citizenshipList.length > 0 &&
                  this.state.citizenshipList.map(option => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextValidator>
        

          <TextValidator
          fullWidth 
          id="workStatus"
          select
          label="Work authorisation"
          value={this.state.workStatus}
          validators={['required']}
          errorMessages={['Work status is required']}
        
          onChange={(e) => this.setState({ workStatus: e.target.value })}
          margin="normal">
                {this.state.workStatusList.length > 0 &&
                  this.state.workStatusList.map(option => (
                  <MenuItem key={option.id} value={option.label}>
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
          
          <Grid item lg={3} sm={12} className="paddingH">
            
            <TextValidator
                fullWidth 
                id="candidateStatus"
                label="Candidate Status"
                value={this.state.address}
                validators={['required']}
                errorMessages={['Candidate Status is required']}
                onChange={(e) => {
                  this.setState({ address: e.target.value })
                }}
                margin="normal">
              </TextValidator>
          

                <TextValidator
                fullWidth 
                id="country"
                select
                label="Country"
                value={this.state.country}
                validators={['required']}
                errorMessages={['Country is required']}
                onChange={(e) => {
                  console.log(this.state.countriesRaw.filter(d=>d.name === e.target.value)[0]);
                  var statesRaw = csc.getStatesOfCountry(this.state.countriesRaw.filter(d=>d.name === e.target.value)[0].id);
                
                              this.setState({
                                country:e.target.value,
                                states:statesRaw.map(d=>d.name),
                                statesRaw:statesRaw,
                                state:statesRaw.map(d=>d.name)[0]
                              });
                }}
                ymargin="normal">
                                  {this.state.countries.map(option => (
                                    <MenuItem key={option} value={option}>
                                      {option}
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
                  onChange={(e) => {
                   
                    var st = this.state.statesRaw.filter(d=>d.name === e.target.value)
                    var id = st[0].id;
                    
                   console.log(id);
                    
                    var citiesRaw = csc.getCitiesOfState(id);
                    
                   

                    var cities = citiesRaw.map(d=>d.name);

                      this.setState({
                        state:e.target.value,
                        cities: cities,
                        city:cities[0]
                        })
                    }
                  }
                  margin="normal">
                        {this.state.states.map((option,i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                  </TextValidator>

                  <TextValidator
                  fullWidth 
                  id="city"
                  select
                  label="City"
                  value={this.state.city}
                  validators={['required']}
                  errorMessages={['City is required']}
                  onChange={(e) => this.setState({ city: e.target.value })}
                  margin="normal">
                        {this.state.cities.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                  </TextValidator>
        
          </Grid>

          <Grid item lg={12} style={{textAlign:"center", padding:10}}>
                    <Divider style={{margin:10}}/>
                    <Button variant="contained" color="primary" type="submit"> Next</Button>
          </Grid>
           
        
        </Grid>

      </ValidatorForm>
    );
  }
};

