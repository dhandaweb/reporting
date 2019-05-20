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

export default class Personal extends React.Component {

  constructor(props) {
    super(props);

    this.titleList = options.titleList;
    this.genderList = options.genderList;
    this.visaStatusList = options.visaStatusList;
    this.sourceList = options.sourceList;
    
    this.state = {
      selectedDate: new Date('2014-08-18T21:11:54'),
      expanded: 'panel1',
      gender: this.genderList[0].value,
      title: this.titleList[0].value,
      city: "city1",
      state: "state1",
      country: "country1",
      source:this.sourceList[0].value,
      visaStatus: this.visaStatusList[0].value,
      workExperienceRange: {
        min: 1,
        max: 3,
      },
      salaryRange: {
        min: 60000,
        max: 70000,
      }
    };
  }



  render() {


    const cities = [
      {
        value: 'city1',
        label: 'City1',
      },
      {
        value: 'city2',
        label: 'City2',
      }
    ];

    const state = [
      {
        value: 'state1',
        label: 'state1',
      },
      {
        value: 'state2',
        label: 'state3',
      }
    ];
    const country = [
      {
        value: 'country1',
        label: 'country1',
      },
      {
        value: 'country2',
        label: 'country2',
      }
    ];


    return (<div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField id="title" style={{ margin: 8 }} select label="Select a title" value={this.state.title} helperText="Please select your title" margin="normal">
            {this.titleList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="firstName" label="First name" margin="normal" style={{ margin: 8 }} />
          <TextField id="middleName" label="Middle name" margin="normal" style={{ margin: 8 }} />
          <TextField id="lastName" label="Last name" margin="normal" style={{ margin: 8 }} />
          <TextField id="gender" style={{ margin: 8 }} select label="Select" value={this.state.gender} helperText="Please select your gender" margin="normal">
            {this.genderList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField id="standard-full-width" label="Address" style={{ margin: 8 }} placeholder="Placeholder" fullWidth margin="normal" />
        </Grid>

        <Grid item xs={12}>


          <TextField id="city" select label="Select" value={this.state.city} style={{ margin: 8 }} helperText="Please select your city" margin="normal" >
            {cities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="state" select label="Select" value={this.state.state} style={{ margin: 8 }} helperText="Please select your state" margin="normal" >
            {state.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="country" select label="Select" value={this.state.country} style={{ margin: 8 }} helperText="Please select your country" margin="normal" >
            {country.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


        <Grid item xs={12}>


          <TextField id="primarySkill" label="Primary skill " margin="normal" style={{ margin: 8 }} />
          <TextField id="culturalBackground" label="Cultural Background " margin="normal" style={{ margin: 8 }} />
          <TextField id="visaStatus" select label="Visa Status" value={this.state.visaStatus} style={{ margin: 8 }} helperText="Please select your visa satus" margin="normal" >
            {this.visaStatusList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="source" select label="Source" value={this.state.source} style={{ margin: 8 }} helperText="Please select your source" margin="normal" >
            {this.sourceList.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Grid>


        <Grid container spacing={24}>
          <Divider />

          <Grid item xs={12}>
            <p style={{ padding: 15 }} noWrap>
              Work experience range
          </p>
            <div className="paddingH"><InputRange
              maxValue={20}
              step={1}
              minValue={0}
              formatLabel={value => `${value} Years`}
              value={this.state.workExperienceRange}
              onChange={value => this.setState({ workExperienceRange: value })}
              onChangeComplete={value => console.log(value)} />
            </div>
          </Grid>

        </Grid>

        <Grid container spacing={24}>

          <Grid item xs={12}>
            <p style={{ padding: 15 }} noWrap>
              Salary range
          </p>
            <div className="paddingH"><InputRange
              maxValue={120000}
              step={5000}
              minValue={40000}
              formatLabel={value => `${value} AUD`}
              value={this.state.salaryRange}
              onChange={value => this.setState({ salaryRange: value })}
              onChangeComplete={value => console.log(value)} />
            </div>
          </Grid>

        </Grid>


      </Grid>




    </div>);
  }
};

