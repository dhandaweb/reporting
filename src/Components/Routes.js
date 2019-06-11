import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';

import Main from './Main';
import SignIn from './SignIn';

import Dashboard from './Main/Dashboard';
import Details from './Main/Details';


import List from './Main/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  subHeader: {
    background: '#f3f3f3',
    padding: '10px',
  },

};


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (localStorage.getItem('username') !== null && localStorage.getItem('username') !== undefined)
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
);




export default class Routes extends React.Component {



  constructor(props) {
    super(props);
  
    this.user = localStorage.getItem('username');

    console.log(this.user);

  }



  render() {
    return (
      <Router>
        <div>

          <Route exact path="/" component={Main} />
          <Route exact path="/signin" component={SignIn} />
          
          <PrivateRoute path='/dashboard' component={Main} />
          <PrivateRoute path='/details' component={Main} />
          <PrivateRoute path='/list' component={Main} />
          <PrivateRoute path='/Option' component={Main} />
          <PrivateRoute path="/profile" component={Main} />
          
          {/* <Route exact path="/dashboard" component={Main} />
          <Route exact path="/details" component={Main} /> */}
        
        </div>
      </Router>
    )
  }
};