import React from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
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



import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export class VisualRoutes extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.state = {
        expanded: localStorage.getItem('sideBar') === 'true' ? true : false
      };
      console.log("loading again ", localStorage.getItem('sideBar'));
  }

  onSelect = (selected) => {
    this.props.history.push('/'+ selected);
  };
  onToggle = (expanded) => {
    localStorage.setItem('sideBar', expanded);
      this.setState({ expanded: expanded });
  };

  render() {
    var h = window.innerHeight > 500 ? window.innerHeight -64 : window.innerHeight -70;

    // return (
    //   <Router>
    //     <Grid  style={{ padding: 0, height:h }} container justify="space-evenly" >
    //       <Grid  xs={12} lg={2} md={2} sm={12} item className="sideBar" >
    //         <List
    //               component="nav"
    //               aria-labelledby="nested-list-subheader"
    //               subheader={
    //                 <ListSubheader component="div" id="nested-list-subheader">
    //                   Navigation
    //                 </ListSubheader>
    //               }
    //             >
    //         <ListItem button component={Link} to="/dashboard">
    //           <ListItemIcon>
    //             <DashboardIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Dashboard" />
    //         </ListItem>
          
    //         <ListItem button component={Link} to="/list">
    //           <ListItemIcon>
    //             <ListIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Candidate list" />
    //         </ListItem>
          
    //         <ListItem button component={Link} to="/details">
    //           <ListItemIcon>
    //             <AddIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Add candidate" />
    //         </ListItem>
          
          
    //         <ListItem button component={Link} to="/users">
    //           <ListItemIcon>
    //             <AccountCircle />
    //           </ListItemIcon>
    //           <ListItemText primary="Users" />
    //         </ListItem>

    //         <ListItem button component={Link} to="/Option">
    //           <ListItemIcon>
    //             <SettingIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Admin" />
    //         </ListItem>
    //       </List>
         
    //       </Grid>

    //       <Grid xs={12} lg={10} md={10} sm={12} style={{ background: "#f5f5f5" }} item className="mainContent">
    //           <Route exact path="/" component={Dashboard} />
    //           <Route exact path="/dashboard" component={Dashboard} />
    //           <Route exact path="/details" component={Details} />
    //           <Route exact path="/list" component={TalentList} />
    //           <Route exact path="/Option" component={Option} />
    //           <Route exact path="/users" component={Users} />
    //           <Route exact path="/profile" component={Profile} />
    //           <Footer/>
    //       </Grid>
    //     </Grid>
    //   </Router>
    // )
    return (
      <Router>
          <div style={{ marginLeft: this.state.expanded === true ? 240 : 64, height:h, width:'100%' }} >
               <SideNav onSelect={this.onSelect} expanded={this.state.expanded} onToggle={this.onToggle} className="sideBar">
                    <SideNav.Toggle />
                    <SideNav.Nav>
                  
                        <NavItem eventKey="dashboard" >
                            <NavIcon>
                              <DashboardIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Dashboard">
                                Dashboard
                            </NavText>
                        </NavItem>
                       

                        <NavItem eventKey="list">
                            <NavIcon>
                            <ListIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Candidate list">
                            Candidate list
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="details">
                            <NavIcon>
                            <AddIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Add candidate">
                            Add candidate
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="users">
                            <NavIcon>
                            <AccountCircle style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Users">
                            Users
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="Option">
                            <NavIcon>
                            <SettingIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Admin">
                            Admin
                            </NavText>
                        </NavItem>

                     

                    </SideNav.Nav>
                </SideNav>
                <div className="main" >
                   <Route exact path="/" component={Dashboard} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/details" component={Details} />
                  <Route exact path="/list" component={TalentList} />
                  <Route exact path="/Option" component={Option} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/profile" component={Profile} />
                  <Footer/>
                </div>



         
              
        
        </div>
      </Router>
    )
  }
  
};
export default withRouter(VisualRoutes);