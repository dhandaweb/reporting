import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './Dashboard';
import Details from './Details';
import Profile from './Profile';
import List from './List';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';



export default class VisualRoutes extends React.Component {

  render() {
    return (
      <Router>
        <Grid  style={{ padding: 20 }} container justify="space-evenly" >
          <Grid  xs={12} lg={2} md={2} sm={12} style={{ padding: 5 }} item >
            <Paper>
              <MenuList>
                <MenuItem >
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <Button component={Link} to="/dashboard">Dashboard</Button>
                </MenuItem>
                <MenuItem >
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <Button component={Link} to="/details">Details</Button>
                </MenuItem>
                <MenuItem >
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <Button component={Link} to="/List">List</Button>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid xs={12} lg={10} md={10} sm={12} style={{ padding: 5 }} item>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/details" component={Details} />
              <Route exact path="/List" component={List} />
              <Route exact path="/profile" component={Profile} />
          </Grid>
        </Grid>
      </Router>
    )
  }
};