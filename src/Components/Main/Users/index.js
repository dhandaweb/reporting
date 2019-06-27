import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";
import { setSnackBar } from "../../../Redux/Actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import env from '../../../environment.json';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export class Users extends React.Component {

  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setNetUser = this.setNetUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.roleList = ["editor","admin"]
    this.state = {
      userlist: [],
      openModal: false,
      firstName:'',
      lastName:"",
      role:this.roleList[0],
      groupId:localStorage.getItem('userGroupId'),
      userName:"",
      password:Math.random().toString(36).slice(-8),
      accountStatus:1
    };
    
      this.getUserList();
      this.setNetUser();
  }

getUserList(){
  axios({
    method: 'post',
    url: env.endPointUrl + 'getuserList',
    data: {
      groupId: localStorage.getItem('userGroupId'),
    }
  })
    .then(response => {
      this.setState({ userlist: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
}

  setNetUser(){
    this.setState({ 
      firstName:'',
      lastName:"",
      role:this.roleList[0],
      groupId:localStorage.getItem('userGroupId'),
      userName:"",
      password:Math.random().toString(36).slice(-8),
      accountStatus:1
     });
  }

  handleOpen() {
    this.setState({ openModal: true });
  };
  handleClose(){
    this.setState({ openModal: false });
  };

  handleSubmit(){

    axios({
        method:'post',
        url: env.endPointUrl + 'adduser',
        data: this.state
      })
      .then(response => {
         this.handleClose();
         this.getUserList();
         this.props.setSnackBar({ show: true, message: "New user added sucessfully." });
         
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

deleteUser(user){
      axios({
        method:'post',
        url: env.endPointUrl + 'inActiveUser',
        data: {id:user.id}
      })
      .then(response => {
        this.getUserList();
        this.props.setSnackBar({ show: true, message: "User removed added sucessfully." });
        
     })
    .catch(function (error) {
       console.log(error);
    });
}


  render() {
    return (<Grid container spacing={24} className="mainContent">
      <div className="subHeading">
        <AccountCircle className="dashboard" />
        <Typography className="title" variant="subtitle1" noWrap> User list</Typography>
        <Button style={{float:'right'}}  size="small" onClick={this.handleOpen} variant="contained" color="secondary"> Add user</Button>
      </div>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openModal}
        onClose={this.handleClose}
      >

        <Card className="signInCon">
        <CardHeader
          title="Add user"
          subheader="Please sign in to portal"
        />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >

        <CardContent>

            <TextValidator
              id="userName"
              label="User name"
              margin="normal"
              onChange={(e) => this.setState({ userName: e.target.value })}
              name="email"
              fullWidth
              value={this.state.userName}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
             <TextValidator
              id="firstName"
              label="First Name"
              margin="normal"
              onChange={(e) => this.setState({ firstName: e.target.value })}
              name="firstName"
              fullWidth
              value={this.state.firstName}
              validators={['required']}
              errorMessages={['this field is required']}
            />
              <TextValidator
              id="lastName"
              label="Last Name"
              margin="normal"
              onChange={(e) => this.setState({ lastName: e.target.value })}
              name="lastName"
              fullWidth
              value={this.state.lastName}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator 
              fullWidth 
              id="role"
              onChange={(e) => this.setState({ role: e.target.value })}
              select 
              label="Role"
              value={this.state.role}
              validators={['required']}
              errorMessages={['this field is required']}
              margin="normal">
                {this.roleList.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextValidator>

          </CardContent>
          <CardActions>
            <Button size="small" className="siginSubmit" variant="contained" color="primary" type="submit" >Add user</Button>
          </CardActions>
        </ValidatorForm>

      </Card>

      </Modal>

     { this.state.userlist.length > 0 &&
      <Paper style={{ margin: 10, width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userlist.map((row, i) => {
              return <TableRow key={i}>
                <TableCell >{row.firstName} {row.lastName}</TableCell>
                <TableCell >{row.role}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>  <IconButton onClick={() => { this.deleteUser(row) }}> <DeleteIcon /></IconButton></TableCell>
              
              </TableRow>
            })}
          </TableBody>
        </Table>
      </Paper>
     }</Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
