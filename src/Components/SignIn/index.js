import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

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
    localStorage.setItem('user', "Dharminder dhanda");
    this.props.history.push('/dashboard');
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