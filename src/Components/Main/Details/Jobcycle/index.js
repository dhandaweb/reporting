import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';


import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import options from './../../options';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

export default class Jobcycle extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.jobTypeList = options.jobTypeList;
    this.jobCategoryList = options.jobCategoryList;

    this.cities = options.cities;
    this.states = options.states;
    this.countries = options.countries;
    
    this.state = {
      selectedDate: new Date('2014-08-18T21:11:54'),
     jobTitle:"",
     jobType:"",
     jobCategory:"",
     hiringManager:"",
     jobCity:"",
     jobState:"",
     jobCountry:"",
    };
  }



  render() {


    return ( <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          
          <TextField id="jobTitle" label="Job Title" margin="normal" style={{ margin: 8 }} />

          <TextField id="jobType" style={{ margin: 8 }} select label="Job type" value={this.state.jobType} helperText="Please select job type" margin="normal">
            {this.jobTypeList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="jobCategory" style={{ margin: 8 }} select label="Job category" value={this.state.jobCategory} helperText="Please select job category" margin="normal">
            {this.jobCategoryList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="hiringManager" label="Hiring manager" margin="normal" helperText="Please type hiring manager name" style={{ margin: 8 }} />
        </Grid>
        <Grid item xs={12}>
          

          <TextField id="city" style={{ margin: 8 }} select label="Job city" value={this.state.jobCity} helperText="Please select job city" margin="normal">
            {this.cities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="state" style={{ margin: 8 }} select label="Job state" value={this.state.jobState} helperText="Please select job state" margin="normal">
            {this.states.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="country" style={{ margin: 8 }} select label="Job country" value={this.state.jobCountry} helperText="Please select job country" margin="normal">
            {this.countries.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
  

        <Grid item xs={12}>

        <Grid container >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={3}> <DatePicker margin="normal" label="Job opened date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Cv submission date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Offer date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Joining date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Order book date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Revenue realization date" value={this.state.selectedDate} /></Grid>
            <Grid item xs={3}> <DatePicker margin="normal" label="Revenue realization date" value={this.state.selectedDate} /></Grid>
        </MuiPickersUtilsProvider>
          
        </Grid>
        </Grid>
      </Grid>




    </div>);
  }
};

