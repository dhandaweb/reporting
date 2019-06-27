import React from 'react';
import { connect } from "react-redux";
import {setUser} from "../../Redux/Actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import env from '../../environment.json';

export class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showError:false
    }

    this.handleErrorClose = this.handleErrorClose.bind(this);
  }

  handleErrorClose(){
    this.setState({ showError:false });
  }

  handleEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  handlePassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  }

  handleSubmit = () => {

      axios({
          method:'post',
          url: env.endPointUrl + 'finduser',
          data: {
            userName: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          
            if(response.data.length > 0){
                  localStorage.setItem('userName', response.data[0].userName);
                  localStorage.setItem('userFullName', response.data[0].firstName + " " + response.data[0].lastName);
                  localStorage.setItem('userId', response.data[0].id);
                  localStorage.setItem('userGroupId', response.data[0].groupId);
                  localStorage.setItem('sideBar', true);
                  this.props.history.push('/dashboard');
            }
            else{
              this.setState({ showError:true });
              console.log(this.state.showError)
            }
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

  render() {

    return (
      <Card className="signInCon">
        <CardHeader
          avatar={
            <Avatar className="siginInHeadingIcon">
              R
            </Avatar>
          }

          title="Reporting"
          subheader="Please sign in to portal"
        />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >


          <CardContent>
          <Snackbar
              message="Invalid username or password" 
              open={this.state.showError}
              anchorOrigin={{
                horizontal:'center',
                vertical:'top'
              }}
              autoHideDuration={3000}
              onClose={this.handleErrorClose}
              >
            </Snackbar>
             

            <TextValidator
              id="userName"
              label="User name"
              margin="normal"
              onChange={this.handleEmail}
              name="email"
              fullWidth
              value={this.state.email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <TextValidator
              id="password"
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              onChange={this.handlePassword}
              name="password"
              value={this.state.password}
              validators={['required']}
              errorMessages={['this field is required']}
            />


          </CardContent>
          <CardActions>
            <Button size="small" className="siginSubmit" variant="contained" color="primary" type="submit" >Sign in</Button>
          </CardActions>
        </ValidatorForm>


      </Card>
    );
  }
};



const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (obj)=> dispatch(setUser(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);