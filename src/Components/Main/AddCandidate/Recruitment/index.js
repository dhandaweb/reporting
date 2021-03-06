import React from 'react';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';
import env from '../../../../environment.json';
import options from './../../options';

export default class Recruitment extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getOption = this.getOption.bind(this);

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
     
     
      recruiterList:[{id:0,label:"list not loaded"}],
      creList:[{id:0,label:"list not loaded"}],
      accountManagerList:[{id:0,label:"list not loaded"}],
      countryManagerList:[{id:0,label:"list not loaded"}],
      accountDirectorList:[{id:0,label:"list not loaded"}],
      teamList:[{id:0,label:"list not loaded"}],
      geoList:[{id:0,label:"list not loaded"}],
      list:["recruiterList","creList","accountManagerList","countryManagerList","accountDirectorList","teamList","geoList"]
     
    };

    this.getOption(0);
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
    //this.props.recruitmentDetails.netRevenue = this.state.netRevenue;


    this.props.nextHandle(3);
  }
  handleBack() {
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

        <Grid item lg={4} sm={12} className="paddingH">
          <TextValidator
            id="recruiter"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Recruiter is required']}
            label="CV Recruiter"
            value={this.state.recruiter}
            margin="normal"
            onChange={(e) => this.setState({ recruiter: e.target.value })}
            >
            {this.state.recruiterList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
           
          </TextValidator>

          <TextValidator
            id="cre"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['CRE is required']}
            label="CRE"
            value={this.state.cre}
            margin="normal"
            onChange={(e) => this.setState({ cre: e.target.value })}
            >
            {this.state.creList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>

          <TextValidator
            id="manager"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Account manager is required']}
            label="Account manager"
            value={this.state.accountManager}
            margin="normal" 
            onChange={(e) => this.setState({ accountManager: e.target.value })}
            >
            {this.state.accountManagerList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>

          <TextValidator
            id="countryManager"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Country manager is required']}
            label="Country manager"
            value={this.state.countryManager}
            margin="normal"
            onChange={(e) => this.setState({ countryManager: e.target.value })}
            >
            {this.state.countryManagerList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>

        </Grid>

        <Grid item lg={4} sm={12} className="paddingH">
          <TextValidator
            id="accountDirector"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Account director is required']}
            label="Account director"
            value={this.state.accountDirector}
            margin="normal"
            onChange={(e) => this.setState({ accountDirector: e.target.value })}
            >
            {this.state.accountDirectorList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>


          <TextValidator
            id="team"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Team is required']}
            label="Team"
            margin="normal"
            value={this.state.team}
            onChange={(e) => this.setState({ team: e.target.value })}
            >
            {this.state.teamList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>

          <TextValidator
            id="geo"
            select 
            fullWidth
            validators={['required']}
            errorMessages={['Geo is required']}
            label="Geo"
            value={this.state.geo}
            onChange={(e) => this.setState({ geo: e.target.value })}
            margin="normal" >
            {this.state.geoList.map(option => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextValidator>

        </Grid>

        <Grid item lg={4} sm={12} className="paddingH">

          <TextValidator
            id="commissionAmount"
            fullWidth
            validators={['required','isNumber']}
            errorMessages={['Commission amount is required','Should be number']}
            label="Commission amount"
            value={this.state.commissionAmount}
            onChange={(e) => this.setState({ commissionAmount: e.target.value })}
            margin="normal" >
          </TextValidator>

          <TextValidator
            id="commissionStatus"
            fullWidth
            label="Commission status"
            validators={['required']}
            errorMessages={['Commission amount is required']}
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

          

        </Grid>

        <Grid item lg={12} style={{textAlign:"center", padding:10}}>
            
                <Divider style={{margin:10}}/>
                <Button onClick={this.handleBack}> Back  </Button>
                <Button variant="contained" color="primary" type="submit" > Next</Button>
           
        </Grid>
     
      </Grid>


    </ValidatorForm>);
  }
};



