import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default class Profile extends React.Component {
  render() {
    return (
      <Grid container spacing={24} className="mainContent">
      <div className="subHeading">
        <AccountCircle className="dashboard" />
        <Typography className="title" variant="subtitle1" noWrap> Profile</Typography>
      </div>
      </Grid>
    );
  }
};