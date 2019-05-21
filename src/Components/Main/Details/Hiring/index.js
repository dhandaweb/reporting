import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import options from './../../options';
import Grid from '@material-ui/core/Grid';

export default class Hiring extends React.Component {

  constructor(props) {
    super(props);


    this.clientList = options.clientList;
    this.creList = options.creList;
    this.recruiterList = options.recruiterList;
    this.accountManagerList = options.accountManagerList;
    this.countryManagerList = options.countryManagerList;
    this.accountDirectorList = options.accountDirectorList;


    this.teamList = options.teamList;
    this.geoList = options.geoList;



    this.state = {
      client: "",
      cre: "",
      recruiter: "",
      accountManager: "",
      countryManager: "",
      accountDirector: "",
      team: "",
      geo: ""
    };
  }



  render() {


    return (

      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField id="client" style={{ margin: 8 }} select label="Client" value={this.state.client} helperText="Please select your client" margin="normal">
              {this.clientList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField id="recruiter" select label="CV Recruiter" value={this.state.recruiter} style={{ margin: 8 }} helperText="Please select your recruiter" margin="normal" >
              {this.recruiterList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="cre" select label="CRE" value={this.state.cre} style={{ margin: 8 }} helperText="Please select your cre" margin="normal" >
              {this.creList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="manager" select label="Account manager" value={this.state.accountManager} style={{ margin: 8 }} helperText="Please select your account manager" margin="normal" >
              {this.accountManagerList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="countryManager" select label="Country manager" value={this.state.countryManager} style={{ margin: 8 }} helperText="Please select your country manager" margin="normal" >
              {this.countryManagerList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="accountDirector" select label="Account director" value={this.state.countryManager} style={{ margin: 8 }} helperText="Please select your account director" margin="normal" >
              {this.accountDirectorList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>

            <TextField id="team" select label="Team" value={this.state.team} style={{ margin: 8 }} helperText="Please select your team" margin="normal" >
              {this.teamList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="geo" select label="Geo" value={this.state.geo} style={{ margin: 8 }} helperText="Please select your Geo" margin="normal" >
              {this.geoList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid item xs={12}>

          </Grid>

        </Grid>




      </div>);
  }
};

