import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

export default class SignIn extends React.Component {
  render() {
    return (
      <Card  className="signInCon">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         Sign In
        </Typography>
        <TextField
          id="standard-uncontrolled"
          label="Please enter email"
          defaultValue="Email"
          margin="normal"
        />
          <TextField
          id="standard-uncontrolled"
          label="Please enter password"
          defaultValue="Password"
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to="/dashboard">Sign in</Button>
      </CardActions>
    </Card>
    );
  }
};