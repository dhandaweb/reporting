import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import data from '../Dashboard/data.json';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';




export default class Details extends React.Component {
 
  constructor(props) {
    super(props);
    
   
    this.state = {
      activeStep:0,
    };

    }

   

 render() {

    return (
      <div>
      		<h1></h1>
      		{data.map((detail,index)=>
      			{
      				return<div>

      				 
      							<h1>{detail.title}-
      							{detail.firstName}
							     {detail.lastName}</h1>
							       {detail.gender}
							        {detail.ethnicity}
							        {detail.citizenship}
							        {detail.workStatus}
							        {detail.primarySkill}
							        {detail.source}
							        {detail.currentEmployer}
							        {detail.salaryMin}
							        {detail.salaryMax}
							        {detail.address}
							        {detail.city}
							        {detail.state}
							        {detail.country}
							        {detail.workExpMin}
							        {detail.workExpMax}
							        
							        {detail.client}
							       {detail.hiringManager}
							        {detail.jobTitle}
							        {detail.jobType}
							        {detail.jobCategory}
							       
							        {detail.jobAddress}
							        {detail.jobCity}
							        {detail.jobState}
							        {detail.jobCountry}
							        
							        {detail.jobOpenedDate}
							        {detail.cvSubmissionDate}
							        {detail.offerStatus}
							        {detail.offerDate}
							        {detail.joiningDate}
							        

							        {detail.recruiter}
							        {detail.cre}
							        {detail.accountManager}
							        {detail.accountDirector}
							        {detail.countryManager}
							        {detail.team}
							        {detail.geo}

							        {detail.commissionAmount}
							        {detail.commissionStatus}
							        {detail.commissionDate}
							        {detail.netRevenue}

							        {detail.pipelineType}
							        {detail.invoiceType}
							        {detail.invoiceNo}
							        {detail.billingAmount}
							        {detail.gst}
							        {detail.invoiceAmount}
							        {detail.orderBookAmount}
							        {detail.orderBookDate}
							        {detail.revenueRealizationDate}
							        {detail.revenueAmount}
							        {detail.financialYear}
							        {detail.month}
      						</div>
      			})}


      </div>
    );
  }
};