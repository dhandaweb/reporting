import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PieChart from './PieChart';

export default class Dashboard extends React.Component {
  
  render() {
    return (
      <div>
        <Grid container spacing={24}>
            <Grid item xs={3}>
                <PieChart/>
            </Grid>
        </Grid>
       </div>
    );
  }
};