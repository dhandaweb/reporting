import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import SignIn from '../../SignIn';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
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
  render() {

    return (
      <AppBar position="sticky">
        <Toolbar >
        <IconButton  color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          <Typography style={{ padding: 5 }} component="h1" variant="title" color="inherit" noWrap>
         Reporting
          </Typography>

        <Chip 
          style={{ position: 'absolute', right: '10px' }}
          avatar={
            <Avatar>
               <AccountCircle />
            </Avatar>
          }
          color="secondary" 
          component={Link} to="/signin"
          label="Sign in"/>

        </Toolbar>
       
         
      </AppBar>
    );
  }
};