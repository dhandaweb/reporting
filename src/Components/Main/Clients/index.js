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
import PeopleIcon from '@material-ui/icons/People';
import env from '../../../environment.json';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';

export class Clients extends React.Component {

  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setNetUser = this.setNetUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHiringMangerList = this.getHiringMangerList.bind(this);
    
    this.state = {
      clientList: [],
      openModal: false,
      clientName: '',
      clientDescription: '',
      managerlist:[],
      groupId: localStorage.getItem('userGroupId'),
    };

    this.getClientList();

  }

  getClientList() {
    axios({
      method: 'post',
      url: env.endPointUrl + 'getClientList',
      data: {
        userGroupId: localStorage.getItem('userGroupId'),
      }
    })
      .then(response => {

        var list  = response.data.map(item=>{
          item.managerlist=[]; 
          item.addText='';
          return item;
        });

        this.setState({ clientList: list });
        this.getClientHiringManagerList(0);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setNetUser() {
    this.setState({
      clientName: '',
      clientDescription: '',
      managerlist:[],
      userGroupId: localStorage.getItem('userGroupId'),
    });
  }

  componentDidMount() {
    this.setNetUser();
  }

  handleOpen() {
    this.setState({ openModal: true });
  };

  handleClose() {
    this.setState({ openModal: false });
  };

  handleSubmit() {

    axios({
      method: 'post',
      url: env.endPointUrl + 'addClient',
      data: {name:this.state.clientName,description:this.state.clientDescription,userGroupId:localStorage.getItem('userGroupId'), status:1}
    })
      .then(response => {
        this.setState({ clientName: "",clientDescription:"" });
      
        this.handleClose();
        this.getClientList();
        this.props.setSnackBar({ show: true, message: "New client added sucessfully." });

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  updateHiringManager(item,d){
   
    axios({
      method: 'post',
      url: env.endPointUrl + 'updateHiringManager',
      data: { name: d.name, id:d.id }
    })
      .then(response => {
        this.getHiringMangerList(item,d.id);
        this.props.setSnackBar({ show: true, message: "Hiring manager updated sucessfully." });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getClientHiringManagerList(i){
    if(this.state.clientList[i] !== undefined){
      this.state.clientList[i].isLoading = true;

    axios({
      method: 'post',
      url: env.endPointUrl + 'getHiringManagerList',
      data: { client: this.state.clientList[i].id }
    })
      .then(response => {
        this.state.clientList[i].managerlist = response.data;
        this.state.clientList[i].isLoading = false;
        if(i < this.state.clientList.length-1) this.getClientHiringManagerList(i+1);
        else this.setState({ clientList: this.state.clientList });

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  getHiringMangerList(item){

   axios({
      method: 'post',
      url: env.endPointUrl + 'getHiringManagerList',
      data: { client: item.id }
     })
      .then(response => {
        item.addText = "";
        item.managerlist = response.data;
        this.setState({ clientList: this.state.clientList });

      })
      .catch(function (error) {
        console.log(error);
      });

      

  }

  addHiringmanger(item){
        axios({
              method: 'post',
              url: env.endPointUrl + 'addHiringManager',
              data: { name:item.addText, client: item.id , status:1 }
            })
              .then(response => {
               
                this.getHiringMangerList(item);
                this.props.setSnackBar({ show: true, message: "New hiring manager added sucessfully." });

              })
              .catch(function (error) {
                console.log(error);
              });
    }

  deleteHiringManager(item,id) {
  
      axios({
        method: 'post',
        url: env.endPointUrl + 'deleteHiringManager',
        data: { id: id }
      })
        .then(response => {
          this.getHiringMangerList(item,id);
          this.props.setSnackBar({ show: true, message: "Hiring manager removed sucessfully." });

        })
        .catch(function (error) {
          console.log(error);
        });

  }

  deleteClient(item){

    axios({
      method: 'post',
      url: env.endPointUrl + 'deleteHiringManagerbyClient',
      data: { id: item.id }
    })
      .then(response => {
        
        axios({
          method: 'post',
          url: env.endPointUrl + 'deleteClient',
          data: { id: item.id }
        })
          .then(response => {
            this.getClientList();
            this.props.setSnackBar({ show: true, message: "Client removed sucessfully." });
    
          })
          .catch(function (error) {
            console.log(error);
          });

      })
      .catch(function (error) {
        console.log(error);
      });


     

  }

  render() {
    return (<Grid container spacing={24} className="mainContent">
      <div className="subHeading">
        <PeopleIcon className="dashboard" />
        <Typography className="title" variant="subtitle1" noWrap> Client list</Typography>
        <Button style={{ float: 'right' }} size="small" onClick={this.handleOpen} variant="contained" color="secondary"> Add client</Button>
      </div>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openModal}
        onClose={this.handleClose}
      >

        <Card className="signInCon">
          <CardHeader
            title="Add Client"
            subheader="At least one hiring manager is required"
          />
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <CardContent>

              <TextValidator
                id="clientName"
                label="Client name"
                margin="normal"
                onChange={(e) => this.setState({ clientName: e.target.value })}
                name="client"
                fullWidth
                value={this.state.clientName}
                validators={['required']}
                errorMessages={['Client name is required']}
              />
              
              <TextValidator
                id="clientName"
                label="Client name"
                margin="normal"
                onChange={(e) => this.setState({ clientDescription: e.target.value })}
                name="clientDescription"
                fullWidth
                value={this.state.clientDescription}
                validators={['required']}
                errorMessages={['Client description is required']}
              />

            </CardContent>
            <CardActions>
              <Button size="small" className="siginSubmit" variant="contained" color="primary" type="submit" >Add client</Button>
            </CardActions>
          </ValidatorForm>

        </Card>

      </Modal>

      {this.state.clientList.length > 0 &&
          this.state.clientList.map((item,i)=>{
           return  <Grid item xl ={3} lg={3} md={3} sm={6} xs={12} key={i}> <Card key={i}> 
             <CardHeader avatar={  <Avatar>  {item.name[0]}</Avatar> }
                          action={ <IconButton onClick={()=>this.deleteClient(item)}> <DeleteIcon /> </IconButton>  }
                          title= {item.name}
                          subheader= {item.description}
                          />
           <CardContent>
             <Typography color="textSecondary">
               List of hiring managers
             </Typography>

             <ValidatorForm
              ref="form"
              onSubmit={(e) => { this.addHiringmanger(item) }}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                fullWidth
                label="Add new"
                value={item.addText}
                validators={['required']}
                errorMessages={['Value is required']}
                onChange={(e) => {
                  item.addText = e.target.value;
                  this.setState({ clientList: this.state.clientList })
                }}
                margin="normal">
              </TextValidator>

            </ValidatorForm>

             <List component="nav" style={{height:300, overflowY:'auto'}}> {
              item.managerlist.length > 0 && 
              item.managerlist.map(d => {
                return <div key={d.id}>
                      <ListItem>
                        {!d.isEditing &&
                          d.name} 

                        {d.isEditing &&
                          <ValidatorForm
                          className="formFullWidth"
                          ref="form"
                          onSubmit={(e) => {  d.isEditing = false;
                            this.updateHiringManager(item,d)
                           }}
                          onError={errors => console.log(errors)}
                          >
                          <TextValidator
                            fullWidth
                            value={d.name} 
                            validators={['required']}
                            errorMessages={['Value is required']}
                            onChange={(e) => {
                              d.name = e.target.value;
                              this.setState({ clientList: this.state.clientList })
                            }}
                            margin="normal">
                          </TextValidator>
                          </ValidatorForm>
                        }

                        {!d.isEditing &&
                        <Edit className="editIcon" onClick={() => { 
                         d.isEditing = !d.isEditing;
                         this.setState({ clientList: this.state.clientList })
                        }}/>
                       }
                        <DeleteIcon className="trashIcon" onClick={(e) => { this.deleteHiringManager(item,d.id)}}/>
                        </ListItem>
                      <Divider />
                </div>
              })
            }
            </List>

           </CardContent>
          
         </Card></Grid>
         })
        }
     </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
