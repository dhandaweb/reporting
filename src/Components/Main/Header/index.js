import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import SignIn from '../../SignIn';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import Routes from './Routes';
const styles = {
  avatar: {
    margin: 10,
  },
 
  search: {
    position: 'relative',
    flexGrow: 1,
    background: '#4d62d6'
  },
};

export default class Header extends React.Component {
  
  
  constructor(props) {
    super(props);
  
    this.signOut = this.signOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      anchorEl: false,
      username:localStorage.getItem('username')
      }

  }
  
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: false });
  };

  signOut = () => {
    this.handleClose();
    localStorage.removeItem('user');
    localStorage.clear();
    
  };
  
  render() {
  
    return (
      <AppBar position="sticky">
        <Toolbar >
        <Avatar className="RIcon">
              R
            </Avatar>
      
          <Typography style={{ padding: 6 }} component="h1" variant="title" color="inherit" noWrap>
          Reporting
          </Typography>
         
          <Chip 
                aria-owns={this.state.anchorEl ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                label={this.state.username}
                color="primary" 
                style={{ position: 'absolute', right: '10px' }}
                avatar={
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                }
          />
      
          <Menu
                  id="menu-appbar"
                  // anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.anchorEl}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={Link} to="/profile">Profile</MenuItem>
                  <MenuItem onClick={this.signOut} component={Link} to="/signIn">Sign out</MenuItem>
                </Menu>
      
       

        </Toolbar>
       
         
      </AppBar>
    );
  }
};