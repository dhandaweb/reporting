import React from 'react';
import { HashRouter as Router, Route, Link,Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from './Dashboard';
import AddCandidate from './AddCandidate';
import Profile from './Profile';
import TalentList from './TalentList';
import Clients from './Clients';
import Users from './Users';
import Admin from './Admin';
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
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';


import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export class VisualRoutes extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.settingToggle = this.settingToggle.bind(this);
    this.reportToggle = this.reportToggle.bind(this);
    this.dashboardToggle = this.dashboardToggle.bind(this);
    
    this.state = {
        expanded: localStorage.getItem('sideBar') === 'true' ? true : false,
        settingExpanded:localStorage.getItem('settingExpanded') === 'true' ? true : false,
        reportExpanded:localStorage.getItem('reportExpanded') === 'true' ? true : false,
        dashboardExpanded:localStorage.getItem('dashboardExpanded') === 'true' ? true : false,
      };
  }

  onSelect = (selected) => {
    console.log(selected);
    this.props.history.push('/'+ selected);
  };

  onToggle = (expanded) => {
    localStorage.setItem('sideBar', expanded);
      this.setState({ expanded: expanded });
  };

  settingToggle(){
    localStorage.setItem('settingExpanded', !this.state.settingExpanded);
    this.setState({ settingExpanded: !this.state.settingExpanded });
  };

  reportToggle(){
    localStorage.setItem('reportExpanded', !this.state.reportExpanded);
    this.setState({ reportExpanded: !this.state.reportExpanded });
  };

  dashboardToggle(){
    localStorage.setItem('dashboardExpanded', !this.state.dashboardExpanded);
    this.setState({ dashboardExpanded: !this.state.dashboardExpanded });
  };

  render() {
    var h = window.innerHeight > 500 ? window.innerHeight -64 : window.innerHeight -70;
   
    return (
      <Router>
          <div style={{ marginLeft: this.state.expanded === true ? 240 : 64, height:h, width:'100%' }} >
               <SideNav onSelect={this.onSelect} expanded={this.state.expanded} onToggle={this.onToggle} className="sideBar">
                    <SideNav.Toggle />
                    <SideNav.Nav>
                  
                        <NavItem 
                         expanded={this.state.dashboardExpanded}
                         onClick={this.dashboardToggle}
                        >
                            <NavIcon>
                            <DashboardIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Dashboards">
                            Dashboards
                            </NavText>
                                      <NavItem eventKey="dashboard" >
                                      <NavIcon>
                                        <BarChartIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                      </NavIcon>
                                      <NavText style={{ paddingRight: 32 }} title="Dashboard">
                                          Key Parameters
                                      </NavText>
                                  </NavItem>
                        </NavItem>



                       
                       
                        <NavItem 
                         expanded={this.state.reportExpanded}
                         onClick={this.reportToggle}
                        >
                            <NavIcon>
                            <ListIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Reports">
                            Reports
                            </NavText>
                                  <NavItem eventKey="list">
                                  <NavIcon>
                                  <ListIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                  </NavIcon>
                                  <NavText style={{ paddingRight: 32 }} title="Candidate list">
                                  Key Parameters
                                  </NavText>
                              </NavItem>

                              <NavItem eventKey="addCandidate">
                                  <NavIcon>
                                  <AddIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                  </NavIcon>
                                  <NavText style={{ paddingRight: 32 }} title="Add candidate">
                                  Add Record
                                  </NavText>
                              </NavItem>
                        </NavItem>



                        <NavItem 
                         expanded={this.state.settingExpanded}
                         onClick={this.settingToggle}
                        >
                            <NavIcon>
                            <SettingIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                             Settings
                            </NavText>
                                    <NavItem eventKey="users">
                                        <NavIcon>
                                        <AccountCircle style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                        </NavIcon>
                                        <NavText style={{ paddingRight: 32 }} title="Users">
                                        Users
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="clients">
                                        <NavIcon>
                                        <PeopleIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                        </NavIcon>
                                        <NavText style={{ paddingRight: 32 }} title="Clients">
                                        Clients
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="admin">
                                        <NavIcon>
                                        <SettingIcon style={{ fontSize: '1.75em', verticalAlign: 'middle' }}/>
                                        </NavIcon>
                                        <NavText style={{ paddingRight: 32 }} title="Admin">
                                        Admin
                                        </NavText>
                                    </NavItem>
                        </NavItem>

                     

                    </SideNav.Nav>
                </SideNav>
                <div className="main" >
                   <Route exact path="/" component={Dashboard} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/addCandidate" component={AddCandidate} />
                  <Route exact path="/list" component={TalentList} />
                  <Route exact path="/admin" component={Admin} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/clients" component={Clients} />
                  <Footer/>
                </div>


                
         
              
        
        </div>
      </Router>
    )
  }
  
};
export default withRouter(VisualRoutes);