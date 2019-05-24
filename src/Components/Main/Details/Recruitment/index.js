import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import options from './../../options';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';

export default class Recruitment extends React.Component {

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
    };
  }

  handleSubmit = () => {

  }



  render() {


    return ( <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Grid container >

<Grid item lg={4} className="paddingH">
            <Typography variant="h5" component="h3" > Recruitment   </Typography>
            <TextValidator
              id="recruiter"
              select fullWidth
              label="CV Recruiter"
              value={this.state.recruiter}
              margin="normal" >
              {this.recruiterList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              id="cre"
              select fullWidth
              label="CRE"
              value={this.state.cre}
              margin="normal" >
              {this.creList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              id="manager"
              select fullWidth
              label="Account manager"
              value={this.state.accountManager}
              margin="normal" >
              {this.accountManagerList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              id="countryManager"
              select fullWidth
              label="Country manager"
              value={this.state.countryManager}
              margin="normal" >
              {this.countryManagerList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

          </Grid>

          <Grid item xs={4} className="paddingH">
            <Typography variant="h5" component="h3" > Team details   </Typography>
            <TextValidator
              id="accountDirector"
              select fullWidth
              label="Account director"
              value={this.state.countryManager}
              margin="normal" >
              {this.accountDirectorList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>


            <TextValidator
              id="team"
              select fullWidth
              label="Team"
              helperText="Please select your team"
              margin="normal" >
              {this.teamList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

            <TextValidator
              id="geo"
              select fullWidth
              label="Geo"
              value={this.state.geo}
              margin="normal" >
              {this.geoList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>

          </Grid>

          <Grid item xs={4} className="paddingH">
            
            <Typography variant="h5" component="h3" >Commision details   </Typography>
            
            <TextValidator
              id="commissionAmount"
              fullWidth
              label="Commission amount"
              value={this.state.commissionAmount}
              margin="normal" >
            </TextValidator>

            <TextValidator
              id="commissionStatus"
              fullWidth
              label="Commission status"
              value={this.state.commissionStatus}
              margin="normal" >
            </TextValidator>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker fullWidth margin="normal" label="Commission date" value={this.state.commissionDate} />
            </MuiPickersUtilsProvider>

            <TextValidator
              id="netRevenue"
              fullWidth
              label="Net revenue"
              value={this.state.netRevenue}
              margin="normal" >
            </TextValidator>

          </Grid>

        </Grid>


      </ValidatorForm>);
  }
};

