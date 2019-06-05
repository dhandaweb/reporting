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
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export default class Recruitment extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.clientList = options.clientList;
    this.creList = options.creList;
    this.recruiterList = options.recruiterList;
    this.accountManagerList = options.accountManagerList;
    this.countryManagerList = options.countryManagerList;
    this.accountDirectorList = options.accountDirectorList;


    this.teamList = options.teamList;
    this.geoList = options.geoList;



    this.state = {

      recruiter: this.props.recruitmentDetails.recruiter,
      cre: this.props.recruitmentDetails.cre,
      accountManager: this.props.recruitmentDetails.accountManager,
      accountDirector: this.props.recruitmentDetails.accountDirector,

      countryManager: this.props.recruitmentDetails.countryManager,
      team: this.props.recruitmentDetails.team,
      geo: this.props.recruitmentDetails.geo,

      commissionAmount: this.props.recruitmentDetails.commissionAmount,
      commissionStatus: this.props.recruitmentDetails.commissionStatus,
      commissionDate: this.props.recruitmentDetails.commissionDate,
      netRevenue: this.props.recruitmentDetails.netRevenue,
    };
  }

  handleSubmit = () => {
    this.props.recruitmentDetails.recruiter = this.state.recruiter;
    this.props.recruitmentDetails.cre = this.state.cre;
    this.props.recruitmentDetails.accountManager = this.state.accountManager;
    this.props.recruitmentDetails.accountDirector = this.state.accountDirector;

    this.props.recruitmentDetails.countryManager = this.state.countryManager;
    this.props.recruitmentDetails.team = this.state.team;
    this.props.recruitmentDetails.geo = this.state.geo;

    this.props.recruitmentDetails.commissionAmount = this.state.commissionAmount;
    this.props.recruitmentDetails.commissionStatus = this.state.commissionStatus;
    this.props.recruitmentDetails.commissionDate = this.state.commissionDate;
    this.props.recruitmentDetails.netRevenue = this.state.netRevenue;


    this.props.nextHandle(3);
  }
  handleBack() {
    this.props.nextHandle(1);
  }


  render() {


    return (<ValidatorForm
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
            margin="normal"
            onChange={(e) => this.setState({ recruiter: e.target.value })}
            >
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
            margin="normal"
            onChange={(e) => this.setState({ cre: e.target.value })}
            >
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
            margin="normal" 
            onChange={(e) => this.setState({ accountManager: e.target.value })}
            >
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
            margin="normal"
            onChange={(e) => this.setState({ countryManager: e.target.value })}
            >
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
            value={this.state.accountDirector}
            margin="normal"
            onChange={(e) => this.setState({ accountDirector: e.target.value })}
            >
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
            margin="normal"
            value={this.state.team}
            onChange={(e) => this.setState({ team: e.target.value })}
            >
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
            onChange={(e) => this.setState({ geo: e.target.value })}
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
            onChange={(e) => this.setState({ commissionAmount: e.target.value })}
            margin="normal" >
          </TextValidator>

          <TextValidator
            id="commissionStatus"
            fullWidth
            label="Commission status"
            value={this.state.commissionStatus}
            onChange={(e) => this.setState({ commissionStatus: e.target.value })}
            margin="normal" >
          </TextValidator>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
            fullWidth
             margin="normal"
              label="Commission date"
               value={this.state.commissionDate} 
               onChange={(e) => this.setState({ commissionDate: e })}
               />
          </MuiPickersUtilsProvider>

          <TextValidator
            id="netRevenue"
            fullWidth
            label="Net revenue"
            onChange={(e) => this.setState({ netRevenue: e.target.value })}
            value={this.state.netRevenue}
            margin="normal" >
          </TextValidator>

        </Grid>


        <Grid container spacing={24} >
          <Divider />
          <Grid item xs={12}>
            <Button onClick={this.handleBack}> Back  </Button>
            <Button variant="contained" color="primary" type="submit" > Next</Button>
          </Grid>
        </Grid>

      </Grid>


    </ValidatorForm>);
  }
};

