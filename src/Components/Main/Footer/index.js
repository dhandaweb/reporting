import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class Footer extends React.Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="body1" align="center" color="inherit" >
          Copyright © REPORTING. <span style={{position:'absolute',right:'10px',top:'20px'}}>PHONE: +61 490 080 541 EMAIL: dhandaweb@gmail.com</span>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
};