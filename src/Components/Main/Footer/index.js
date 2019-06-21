import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class Footer extends React.Component {
  render() {
    return (
      <AppBar position="static" color="default" style={{boxShadow:"none",background:"#fff"}}>
        <Toolbar>
          <Typography variant="body1" align="center" color="inherit" >
          Copyright © REPORTING 2019 
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
};