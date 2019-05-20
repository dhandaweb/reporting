import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';

export default class Hiring extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.state = {
      client:"",
      cre:"",
      recruiter:"",
      accountManager:"",
      countryManager:"",
      accountDirector:"",
      team:"",
      geo:""
    };
  }



  render() {

    const clientList = [
      {
        value: 'Mr.',
        label: 'Client 1',
      },
      {
        value: 'Mrs.',
        label: 'Client 2',
      },
      {
        value: 'Dr.',
        label: 'Client 3',
      }
    ];

    const managerList = [
      {
        value: 'male',
        label: 'manager1',
      },
      {
        value: 'female',
        label: 'manager2',
      }
    ];

    const recruiter = [
      {
        value: 'Recruiter1',
        label: 'Recruiter1',
      },
      {
        value: 'Recruiter2',
        label: 'Recruiter2',
      }
    ];

    const cre = [
      {
        value: 'cre1',
        label: 'cre1',
      },
      {
        value: 'cre2',
        label: 'cre2',
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

    const teams = [
      {
        value: 'team1',
        label: 'team1',
      },
      {
        value: 'team2',
        label: 'team2',
      }
    ];

    const geo = [
      {
        value: 'geo1',
        label: 'geo1',
      },
      {
        value: 'geo2',
        label: 'geo2',
      }
    ];

    return (

<div>
        
       
        
       

        <Grid container spacing={24}>
        <Grid item xs={12}>
              <TextField id="client" style={{ margin: 8 }} select label="Select a client" value={this.state.client} helperText="Please select your client" margin="normal">
                  {clientList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
        </Grid>
      
        <Grid item xs={12}>
        <TextField id="recruiter" select  label="Select" value={this.state.recruiter} style={{ margin: 8 }}  helperText="Please select your recruiter" margin="normal" >
                    {recruiter.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField id="cre" select  label="Select" value={this.state.cre} style={{ margin: 8 }} helperText="Please select your cre" margin="normal" >
                    {cre.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
        </Grid>

        <Grid item xs={12}>
                        

                
                  <TextField id="manager" select  label="Select" value={this.state.accountManager} style={{ margin: 8 }} helperText="Please select your account manager" margin="normal" >
                    {managerList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField id="countryManager" select  label="Select" value={this.state.countryManager} style={{ margin: 8 }} helperText="Please select your country manager" margin="normal" >
                    {managerList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
        </Grid>

       
      </Grid>




</div> );
  }
};

