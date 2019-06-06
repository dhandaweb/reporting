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
							        <table>
									<tr>
										<th scope="row">Gender : </th>
										<td>{detail.gender}<br /></td>
									</tr>
									<tr>
										<th scope="row">Ethnicity : </th>
										<td>{detail.ethnicity}<br /></td>
									</tr>
							         <tr>
							         	<th scope="row">Citizenship : </th>
										<td>{detail.citizenship}<br /></td>
							         </tr>
							        
							        <tr>
							         	<th scope="row">Work Status : </th>
										<td>{detail.workStatus}<br /></td>
							         </tr>
							       <tr>
							         	<th scope="row">Primary Skill : </th>
										<td>{detail.primarySkill}<br /></td>
							         </tr> 
							        <tr>
							         	<th scope="row">Source : </th>
										<td>{detail.source}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Current Employer : </th>
										<td>{detail.currentEmployer}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Minimum Salary: </th>
										<td>{detail.salaryMin}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Maximum Salary: </th>
										<td>{detail.salaryMax}<br /></td>
							         </tr>
							       <tr>
							         	<th scope="row">Address : </th>
										<td>{detail.address}<br /></td>
							         </tr> 
							        <tr>
							         	<th scope="row">City : </th>
										<td>{detail.city}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">State : </th>
										<td>{detail.state}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Country : </th>
										<td>{detail.country}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Work Experience Minimum: </th>
										<td>{detail.workExpMin}<br /></td>
							         </tr>
							        <tr>
							         	<th scope="row">Work Experience Maximum : </th>
										<td>{detail.workExpMax}<br /></td>
							         </tr>
							        <tr>
							       	<th scope="row"> Client : </th>
										<td>{detail.client}<br /> </td>
									</tr> 
							        <tr>
							       		<th scope="row">Hiring Manager : </th>
										<td> {detail.hiringManager}<br /></td>
									</tr> 
							         <tr>
							       		<th scope="row">Job Title : </th>
										<td> {detail.jobTitle}<br /></td>
									</tr>
							         <tr>

							       		<th scope="row"> Job Type : </th>
										<td>{detail.jobType}<br /></td>
									</tr>
							        <tr>

							       		<th scope="row"> Job Category: </th>
										<td> {detail.jobCategory}<br /> </td>
									</tr>
							       
							        <tr>

							       		<th scope="row"> Job Address: </th>
										<td>{detail.jobAddress}<br /> </td>
									</tr> 
							         <tr>

							       		<th scope="row">Job City : </th>
										<td>{detail.jobCity}<br /> </td>
									</tr>
							        <tr>

							       		<th scope="row">Job State : </th>
										<td>{detail.jobState}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Job Country : </th>
										<td>{detail.jobCountry}<br /> </td>
									</tr>
							        
							        <tr>

							       		<th scope="row">Job Opened Date : </th>
										<td> {detail.jobOpenedDate}<br /></td>
									</tr> 
							        <tr>

							       		<th scope="row">CV Submission Status: </th>
										<td>{detail.cvSubmissionDate}<br /> </td>
									</tr> 
							         <tr>

							       		<th scope="row">Offer Status : </th>
										<td> {detail.offerStatus}<br /></td>
									</tr>
							         <tr>

							       		<th scope="row">Offer Date : </th>
										<td> {detail.offerDate}<br /></td>
									</tr>
							         <tr>

							       		<th scope="row">Joining Date : </th>
										<td>{detail.joiningDate}<br /> </td>
									</tr>
							        

							         <tr>

							       		<th scope="row">Recruiter : </th>
										<td> {detail.recruiter}<br /></td>
									</tr>
							         <tr>

							       		<th scope="row"> CRE : </th>
										<td>{detail.cre}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Account Manager: </th>
										<td>{detail.accountManager}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Account Director: </th>
										<td>{detail.accountDirector}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Country Manager : </th>
										<td>{detail.countryManager}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Team : </th>
										<td>{detail.team}<br /> </td>
									</tr>
							        <tr>

							       		<th scope="row">GEO : </th>
										<td> {detail.geo}<br /> </td>
									</tr>

							         <tr>

							       		<th scope="row"> Commision Amount : </th>
										<td>{detail.commissionAmount}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Commision Status : </th>
										<td>{detail.commissionStatus}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Commision Date : </th>
										<td>{detail.commissionDate}<br /> </td>
									</tr>
							        <tr>

							       		<th scope="row"> Net Revenue : </th>
										<td> {detail.netRevenue}<br /> </td>
									</tr>

							         <tr>

							       		<th scope="row">Pipeline Type : </th>
										<td>{detail.pipelineType}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Invoice Type : </th>
										<td>{detail.invoiceType}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Invoice Number : </th>
										<td>{detail.invoiceNo}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Billing Amount : </th>
										<td>{detail.billingAmount}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">GST : </th>
										<td>{detail.gst}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Detail Invoice Amount : </th>
										<td>{detail.invoiceAmount}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row"> Order Book Amount : </th>
										<td>{detail.orderBookAmount}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Order Book Date : </th>
										<td>{detail.orderBookDate}<br /> </td>
									</tr>
							        <tr>

							       		<th scope="row">Revenue Realization Date : </th>
										<td>{detail.revenueRealizationDate}<br /> </td>
									</tr> 
							         <tr>

							       		<th scope="row">Revenue Amount : </th>
										<td>{detail.revenueAmount}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Financial Year : </th>
										<td>{detail.financialYear}<br /> </td>
									</tr>
							         <tr>

							       		<th scope="row">Month : </th>
										<td>{detail.month}<br /></td>
									</tr>
							        </table>
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