import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import PieChart from './PieChart';
import BarChart from './BarChart';
import VerticalBar from './VerticalBar';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import DotPlot from './DotPlot';
import TableChart from './TableChart';
import IconCard from './IconCard';

export default class Dashboard extends React.Component {
  
  render() {
    return (
      <div>
        <Grid container spacing={24}>

        <Grid item xs={3}>
                  <Card >
                      <CardContent>
                        <IconCard icon="send" color="primary" title="Total Roles" value="132"/>
                      </CardContent>
                  </Card>
            </Grid>
            <Grid item xs={3}>
                  <Card >
                      <CardContent>
                        <IconCard icon="group" color="secondary" title="Open Positions" value="4"/>
                      </CardContent>
                  </Card>
            </Grid>
            <Grid item xs={3}>
                  <Card >
                      <CardContent>
                        <IconCard icon="money" color="inherit" title="Total commision" value="$52340"/>
                      </CardContent>
                  </Card>
            </Grid>
            <Grid item xs={3}>
                  <Card >
                      <CardContent>
                        <IconCard icon="mood" color="error" title="Active Candidates" value="230"/>
                      </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={4}>
                  <Card >
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom> Pie Chart</Typography>
                        <PieChart/>
                      </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={4}>
                  <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom> Vertical Bar chart</Typography>
                          <VerticalBar/>
                        </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={4}>
                    <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>Bar chart</Typography>
                          <BarChart/>
                        </CardContent>
                    </Card>
            </Grid>
           
            <Grid item xs={4}>
                
                <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>Line chart</Typography>
                          <LineChart/>
                        </CardContent>
                    </Card>
            </Grid>

            <Grid item xs={4}>
                
                <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>Area chart</Typography>
                          <AreaChart/>
                        </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={4}>
                
                <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>Dot plot</Typography>
                          <DotPlot/>
                        </CardContent>
                    </Card>
            </Grid>
          
            <Grid item xs={6}>
                    <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>Table</Typography>
                          <TableChart/>
                        </CardContent>
                    </Card>
            </Grid>
        </Grid>
       </div>
    );
  }
};