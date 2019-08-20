import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
// import logo from './img/logo.png';
import tracologo from './img/traco-logo.png';
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
    this.toggle = this.toggle.bind(this);

    this.state = {
      anchorEl: false,
      dropdownOpen: false,
      username: localStorage.getItem('userFullName')
    }

  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ dropdownOpen: false });
  };

  signOut = () => {
    this.handleClose();
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userGroupId');
    localStorage.removeItem('userFullName');

    localStorage.clear();

  };
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {

    return (
      <AppBar position="sticky">
        <Toolbar >
{/*           
          <img src={logo} style={{width:40}} alt="logo" className="logo" />
          <Typography style={{ padding: 6 }} component="h1" variant="title" color="inherit" noWrap>
            Traco Plug
          </Typography> */}
 <img src={tracologo} style={{height:35}} alt="logo" className="logo" />

          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="headerSetting">
            <DropdownToggle caret>
              <Chip
              className="avatar"
                label={this.state.username}
                color="primary"
                avatar={
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                }
              />
            </DropdownToggle>
            <DropdownMenu right>
              <MenuItem onClick={this.handleClose} component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={this.signOut} component={Link} to="/signIn">Sign out</MenuItem>
            </DropdownMenu>
          </Dropdown>

        </Toolbar>


      </AppBar>
    );
  }
};