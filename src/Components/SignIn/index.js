import React from 'react';
import { connect } from "react-redux";
import {setUser} from "../../Redux/Actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';


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

    var url = 'http://localhost:57315/UserDetail.svc/GetUserDetail';

    // axios.post(url, JSON.stringify({
    //   username: this.state.email,
    //   password: this.state.password
    // }))
    // .then((response)=> {
     
      axios({
          method:'post',
          url:'http://localhost:8080/api/finduser',
          data: {
            username: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
            console.log(response);
            if(response.data.length > 0){

                 // this.props.setUser(response.data[0]);
                  localStorage.setItem('username', response.data[0].UserName);
                  localStorage.setItem('UserId', response.data[0].UserId);
                  localStorage.setItem('UserGroup', response.data[0].UserGroup);
                  console.log("signning in ");
                  this.props.history.push('/dashboard');

            }
            else{
              console.log("Reaching here");
              this.setState({ showError:true });
              console.log(this.state.showError)
            }
    })
    .catch(function (error) {
      console.log(error);
    });



    // var data = {
    //   username: this.state.email,
    //   password: this.state.password
    //     };

    //   var header = {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': 'true',
    //     "Access-Control-Allow-Headers":"Content-Type, Authorization, Accept, Accept-Language",
    //     'Access-Control-Allow-Methods':"GET,POST,DELETE,PUT,OPTIONS",
    //     'Content-Type': 'application/json',
    //   };

    // axios({
    //   method:'post',
    //   headers:header, 
    //   crossDomain: true,
    //   url:'https://jsonplaceholder.typicode.com/posts/1',
    //   data: JSON.stringify({
    //     id: 1,
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1
    //   }),
    //   async:true,
    // })
    // .then(response => {

    //  console.log(response);
    //  localStorage.setItem('user', "Dharminder dhanda");
    //  this.props.history.push('/dashboard');

    // })
    // .catch((error) => {
    //   console.log(error);
    // });


// axios('http://localhost:57315/UserDetail.svc/GetUserDetail', {
//       method: 'POST',
//       data: JSON.stringify({
//         username: "dhanda@gmail.com",
//         password: 'foo'
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       }
//     })
//     .then(response => {
//      console.log(response);
//     })
//     .then(json => console.log(json))






// console.log("Featching");
//     fetch(url, {
//       method: 'POST',
//       body: JSON.stringify({
//         username: this.state.email,
//         password: this.state.password
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       }
//     })
//     .then(response => {
//      console.log(response);
//     })
//     .then(json => console.log(json))

    // axios(url, {
    //   method: 'POST',
    //   data: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    // .then(response => {
    //  console.log(response);
    // })
    // .then(json => console.log(json))


    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: JSON.stringify(data),
    //   dataType: 'json',
    //   async:true,
    //   crossDomain:true,
    //   success: function(data) {
    //    console.log(data);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(url, status, err.toString());
    //   }.bind(this)
    // });

    
    // axios.post(url, data, {headers: header})
    // .then(response => {

    //  console.log(response);
    //  localStorage.setItem('user', "Dharminder dhanda");
    //  this.props.history.push('/dashboard');

    // })
    // .catch((error) => {
    //   console.log(error);
    // })



    
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