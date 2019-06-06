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
import card from './card.css';
import data from '../Dashboard/data.json';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'; 

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

  // export default function SimpleCard() {
  //const classes = useStyles();
  //const bull = <span className={classes.bullet}>•</span>;

 render() {

    return (
      <div>
      		<h1></h1>
      		{data.map((detail,index)=>
      			{
      				return<div>
      						<Card>
      						<CardContent>
        						<Typography class="card-title" color="textSecondary" gutterBottom> 				 
      							<h1>{detail.title}-
      							{detail.firstName}
							     {detail.lastName}</h1></Typography><br />
							       <Typography variant="body2" component="p">
							        {detail.gender}<br />
							        {detail.ethnicity}<br />
							        {detail.citizenship}<br />
							        {detail.workStatus}<br />
							        {detail.primarySkill}<br />
							        {detail.source}<br />
							        {detail.currentEmployer}<br />
							        {detail.salaryMin}<br />
							        {detail.salaryMax}<br />
							        {detail.address}<br />
							        {detail.city}<br />
							        {detail.state}<br />
							        {detail.country}<br />
							        {detail.workExpMin}<br />
							        {detail.workExpMax}<br />
							        
							        {detail.client}<br />
							       {detail.hiringManager}<br />
							        {detail.jobTitle}<br />
							        {detail.jobType}<br />
							        {detail.jobCategory}<br />
							       
							        {detail.jobAddress}<br />
							        {detail.jobCity}<br />
							        {detail.jobState}<br />
							        {detail.jobCountry}<br />
							        
							        {detail.jobOpenedDate}<br />
							        {detail.cvSubmissionDate}<br />
							        {detail.offerStatus}<br />
							        {detail.offerDate}<br />
							        {detail.joiningDate}<br />
							        

							        {detail.recruiter}<br />
							        {detail.cre}<br />
							        {detail.accountManager}<br />
							        {detail.accountDirector}<br />
							        {detail.countryManager}<br />
							        {detail.team}<br />
							        {detail.geo}<br />

							        {detail.commissionAmount}<br />
							        {detail.commissionStatus}<br />
							        {detail.commissionDate}<br />
							        {detail.netRevenue}<br />

							        {detail.pipelineType}<br />
							        {detail.invoiceType}<br />
							        {detail.invoiceNo}<br />
							        {detail.billingAmount}<br />
							        {detail.gst}<br />
							        {detail.invoiceAmount}<br />
							        {detail.orderBookAmount}<br />
							        {detail.orderBookDate}<br />
							        {detail.revenueRealizationDate}<br />
							        {detail.revenueAmount}<br />
							        {detail.financialYear}<br />
							        {detail.month}<br />
							        </Typography>
							        </CardContent>
      								<CardActions>
        							<Button size="small">Edit</Button>
     								 </CardActions>
    								</Card>
      						</div>
      			})}


      </div>
    );
  }
};