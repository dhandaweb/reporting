import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MainRoutes from './MainRoutes';
import Grid from '@material-ui/core/Grid';
import Header from './Header';


export default class Main extends React.Component {
  render() {
    return (<div>
      <Header/>
      <Grid container direction="row-reverse" justify="space-evenly" >
      <MainRoutes/>
    </Grid>
    
     </div>
    );
  }
};


