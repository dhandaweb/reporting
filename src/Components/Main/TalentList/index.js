import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";
import {setSnackBar} from "../../../Redux/Actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';

import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/ViewList';
import Edit from '@material-ui/icons/Edit';

import env from '../../../environment.json';

export class TalentList extends React.Component {

	constructor(props) {
		super(props);
		
		this.handleSnakBarClose= this.handleSnakBarClose.bind(this);

		this.state = {
			activeStep: 0,
			detailData: []
		};

		axios({
			method: 'post',
			url: env.endPointUrl + 'getDetails',
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


	handleSnakBarClose(){
		this.setState({ showSnackBar:false,snackBarMessage:"" });
	  }

	editDetails(details){
		this.props.history.push('/details', { details:details });
	}

	deleteRecord(details){

		axios({
			method: 'post',
			url: env.endPointUrl + 'deleteDetails',
			data: {
				UserId: localStorage.getItem('UserId'),
				UserGroup: localStorage.getItem('UserGroup'),
				id:details.ID
			}
		})
			.then(response => {
				this.state.detailData = this.state.detailData.filter(d=>d.ID !== details.ID);
				this.setState({ detailData: this.state.detailData});
				this.props.setSnackBar({show:true,message:"Record deleted sucessfully."});
			})
			.catch(function (error) {
				console.log(error);
			});
			
	}

	render() {

		return (
			<div>
				 <div className="subHeading">
          <ListIcon className="dashboard"/>
          <Typography className="title" variant="subtitle1" noWrap> Candidate List</Typography>
        </div>
				{this.state.detailData.map(detail => {
					return <div key={detail.ID}>
						
						<Card className="talentRecord" style={{ margin: 10 }}>
							<CardHeader
								avatar={
									<Avatar>
										{detail.firstName[0]}
									</Avatar>
								}
								action={
									<div>
											<IconButton onClick={()=>{this.editDetails(detail)}}><Edit /></IconButton>
											<IconButton onClick={()=>{this.deleteRecord(detail)}}> <DeleteIcon/></IconButton>
									</div>
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

								<Typography className="card-title" color="textSecondary" gutterBottom>

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

const mapStateToProps = state => {
	return { snackBar: state.snackBar };
  };
  
  const mapDispatchToProps = dispatch => {
	return {
	  setSnackBar: (obj)=> dispatch(setSnackBar(obj))
	};
  };
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TalentList);