import React from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from './Dashboard';
import Details from './Details';
import Profile from './Profile';
import TalentList from './TalentList';
import Clients from './Clients';
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
import PeopleIcon from '@material-ui/icons/People';



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

                     

                    </SideNav.Nav>
                </SideNav>
                <div className="main" >
                   <Route exact path="/" component={Dashboard} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/details" component={Details} />
                  <Route exact path="/list" component={TalentList} />
                  <Route exact path="/admin" component={Option} />
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