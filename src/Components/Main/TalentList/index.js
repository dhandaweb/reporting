import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";
import { setSnackBar } from "../../../Redux/Actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';

import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/ViewList';
import Edit from '@material-ui/icons/Edit';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import env from '../../../environment.json';
import Grid from '@material-ui/core/Grid';

import LinearProgress from '@material-ui/core/LinearProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export class TalentList extends React.Component {

	constructor(props) {
		super(props);

		this.handleSnakBarClose = this.handleSnakBarClose.bind(this);
		this.searchRecord = this.searchRecord.bind(this);

		this.state = {
			activeStep: 0,
			detailData: [],
			rawDetailData: [],
			searchText: ''
		};

		axios({
			method: 'post',
			url: env.endPointUrl + 'getDetails',
			data: {
				userId: localStorage.getItem('userId'),
				userGroupId: localStorage.getItem('userGroupId')
			}
		})
			.then(response => {
				console.log(response);
				this.setState({ detailData: response.data, rawDetailData: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});

	}


	handleSnakBarClose() {
		this.setState({ showSnackBar: false, snackBarMessage: "" });
	}

	editDetails(details) {
		this.props.history.push('/addCandidate', { details: details });
	}

	deleteRecord(details) {

		axios({
			method: 'post',
			url: env.endPointUrl + 'deleteDetails',
			data: {
				userId: localStorage.getItem('userId'),
				userGroupId: localStorage.getItem('userGroupId'),
				id: details.id
			}
		})
			.then(response => {
				this.state.detailData = this.state.detailData.filter(d => d.id !== details.id);
				this.setState({ detailData: this.state.detailData, rawDetailData: this.state.detailData });
				this.props.setSnackBar({ show: true, message: "Record deleted sucessfully." });
			})
			.catch(function (error) {
				console.log(error);
			});

	}
	searchRecord(e) {
		this.setState({ searchText: e.target.value });
		
		if (e.target.value.length > 0){
		 this.state.detailData = this.state.rawDetailData.filter(d => { 
			 return d.firstName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.lastName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.hiringManager.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.jobTitle.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.country.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.state.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.city.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.source.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.workStatus.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.pipelineType.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.recruiter.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.team.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
			 d.client.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 
			
			});
		}
		else this.state.detailData = this.state.rawDetailData;

		this.setState({ detailData: this.state.detailData });
	}

	render() {

		return (
			<div>
				<Grid container spacing={24} className="mainContent">
					<div className="subHeading">
						<div className="floatleft">
							<ListIcon className="dashboard" />
							<Typography className="title" variant="subtitle1" noWrap> Candidate List</Typography>
						</div>
						<div className="floatRight">

							<input className="searchInput" placeholder="Search.." onChange={(e) => { this.searchRecord(e) }} value={this.state.searchText} />

						</div>
					</div>
					{this.state.detailData.length === 0 &&
						<div className="progress"> <LinearProgress color="secondary" /> </div>
					}

					{this.state.detailData.length > 0 &&
						this.state.detailData.map(detail => {
							return <Card key={detail.id} className="talentRecord" style={{ margin: 10, width: "100%" }}>
								<CardHeader style={{ paddingBottom: 0 }}
									avatar={
										<Avatar>
											{detail.firstName[0]}
										</Avatar>
									}
									action={
										<div>
											<IconButton onClick={() => { this.editDetails(detail) }}><Edit /></IconButton>
											<IconButton onClick={() => { this.deleteRecord(detail) }}> <DeleteIcon /></IconButton>
										</div>
									}
									title={detail.firstName + " " + detail.lastName + " - " + detail.jobTitle}
									subheader={detail.client + " - " + detail.workExpMax + "yrs of experience"}
								/>

								<CardContent>
									<Typography variant="body2" component="p">
										Presented to {detail.hiringManager} on  {detail.jobType} basis for {detail.jobCategory} with joining date <Moment format={env.timeFormat}>{detail.jobOpenedDate}</Moment>  at  {detail.city} {detail.state} {detail.country}
									</Typography>
									<Typography variant="body2" component="p">
										at {detail.client} for role of {detail.jobTitle}
									</Typography>
									<Typography variant="body2" component="p"> with commision amount : ${detail.commissionAmount}  {detail.offerStatus} on <Moment format={env.timeFormat}>{detail.commissionDate}</Moment>
									</Typography>

									<Typography className="card-title" color="textSecondary" gutterBottom></Typography>
								</CardContent>
								<CardActions>
									<Chip label={detail.source} variant="outlined" />
									<Chip label={detail.workStatus} color="primary" variant="outlined" />
									<Chip label={detail.pipelineType} color="primary" variant="outlined" />
									<Chip label={detail.recruiter} color="primary" variant="outlined" />
									<Chip icon={<GroupWorkIcon />} label={detail.team} color="primary" variant="outlined" />
								</CardActions>
							</Card>

						})}

				</Grid>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return { snackBar: state.snackBar };
};

const mapDispatchToProps = dispatch => {
	return {
		setSnackBar: (obj) => dispatch(setSnackBar(obj))
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(TalentList);