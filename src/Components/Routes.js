import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import Main from './Main';
import SignIn from './SignIn';

import Dashboard from './Main/Dashboard';
import Details from './Main/Details';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  subHeader: {
    background: '#f3f3f3',
    padding: '10px',
  },

};

export default class Routes extends React.Component {

  render() {
    return (
      <Router>
        <div>

          <Route exact path="/" component={Main} />
          <Route exact path="/signin" component={SignIn} />
        
          <Route exact path="/dashboard" component={Main} />
          <Route exact path="/details" component={Main} />
        
        </div>
      </Router>
    )
  }
};