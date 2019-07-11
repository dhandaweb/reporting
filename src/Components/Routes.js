import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";


import Main from './Main';
import SignIn from './SignIn';

import StatusBar from './StatusBar';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== undefined)
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
          <StatusBar/>
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute exact path="/" component={Main} />
          
          <PrivateRoute path='/dashboard' component={Main} />
          <PrivateRoute path='/addCandidate' component={Main} />
          <PrivateRoute path='/list' component={Main} />
        
          <PrivateRoute exact path="/users" component={Main} />
          <PrivateRoute path='/admin' component={Main} />
          <PrivateRoute path="/profile" component={Main} />
          <PrivateRoute path="/clients" component={Main} />
        
        </div>
      </Router>
    )
  }
};