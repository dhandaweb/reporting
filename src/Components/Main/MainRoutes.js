import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './Dashboard';
import Details from './Details';
import Profile from './Profile';
import TalentList from './TalentList';
import Users from './Users';
import Option from './Option';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';



import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import SettingIcon from '@material-ui/icons/Settings';


export default class VisualRoutes extends React.Component {
 
  

  render() {
    var h = window.innerHeight -64;

    return (
      <Router>
        <Grid  style={{ padding: 0, height:h }} container justify="space-evenly" >
          <Grid  xs={12} lg={2} md={2} sm={12} item className="sideBar" >
            <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Navigation
                    </ListSubheader>
                  }
                >
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          
            <ListItem button component={Link} to="/list">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Candidate list" />
            </ListItem>
          
            <ListItem button component={Link} to="/details">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add candidate" />
            </ListItem>
          
          
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button component={Link} to="/Option">
              <ListItemIcon>
                <SettingIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </List>
         
          </Grid>

          <Grid xs={12} lg={10} md={10} sm={12} style={{ background: "#f5f5f5" }} item className="mainContent">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/details" component={Details} />
              <Route exact path="/list" component={TalentList} />
              <Route exact path="/Option" component={Option} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/profile" component={Profile} />
              <Footer/>
          </Grid>
        </Grid>
      </Router>
    )
  }
};
