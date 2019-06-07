import React from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import env from '../../../environment.json';

export default class Details extends React.Component {

	constructor(props) {
		super(props);


		this.state = {
			activeStep: 0,
			detailData: []
		};

		axios({
			method: 'post',
			url: 'http://localhost:8080/api/getDetails',
			data: {
				UserId: localStorage.getItem('UserId'),
				UserGroup: localStorage.getItem('UserGroup')
			}
		})
			.then(response => {
				console.log(response);
				this.setState({ detailData: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});

	  

	}

	// export default function SimpleCard() {
	//const classes = useStyles();
	//const bull = <span className={classes.bullet}>•</span>;

	render() {

		return (
			<div>
				{this.state.detailData.map((detail, index) => {
					return <div>
						<Card className="talentRecord">
							<CardHeader
								avatar={
									<Avatar>
										{detail.firstName[0]}
									</Avatar>
								}
								action={
									<IconButton aria-label="Settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={detail.firstName + " " + detail.lastName + " - " + detail.jobTitle}
								subheader={detail.client + " - " + detail.workExpMax + "yrs of experience"}
							/>

							<CardContent>
								<Typography variant="body2" component="p">
									Presented to {detail.hiringManager} on  {detail.jobType} basis for {detail.jobCategory} with joining date <Moment format={env.timeFormat}>{detail.jobOpenedDate}</Moment>  at  {detail.address}, {detail.city} {detail.state} {detail.country}
								</Typography>
								<Typography variant="body2" component="p">
									to {detail.client} for role of {detail.jobTitle}
								</Typography>
								<Typography variant="body2" component="p"> with commision amount : ${detail.commissionAmount}  {detail.offerStatus} on <Moment format={env.timeFormat}>{detail.commissionDate}</Moment>
								</Typography>

								<Typography color="textSecondary" gutterBottom>

								</Typography>

								<Typography class="card-title" color="textSecondary" gutterBottom>

									{/* {detail.gender}<br />
							        {detail.ethnicity}<br />
							        {detail.citizenship}<br />
							        {detail.workStatus}<br />
							        {detail.primarySkill}<br />
							        <br />
							        {detail.currentEmployer}<br />
							        {detail.salaryMin}<br />
							        {detail.salaryMax}<br />
							        {detail.address}<br />
							        {detail.city}<br />
							        {detail.state}<br />
							        {detail.country}<br />
							        
							        {detail.client}<br />
							        <br />
							        {detail.jobTitle}<br />
							       <br />
							        <br />
							       
							        {detail.jobAddress}<br />
							        {detail.jobCity}<br />
							        {detail.jobState}<br />
							        {detail.jobCountry}<br />
							        
							        <br />
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
							        {detail.month}<br /> */}
								</Typography>
							</CardContent>
							<CardActions>
								{/* <Button size="small" variant="contained" color="secondary">Edit</Button> */}
								<Chip label={detail.source} variant="outlined" />
								<Chip label={detail.workStatus} color="primary" variant="outlined" />
								<Chip label={detail.pipelineType} color="primary" variant="outlined" />
								<Chip label={detail.recruiter} color="primary" variant="outlined" />
								<Chip label={detail.team} color="primary" variant="outlined" />
							</CardActions>
						</Card>
					</div>
				})}


			</div>
		);
	}
};