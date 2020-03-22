import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import { logout } from '../../model/firebase_auth';

function Logout() {
  logout();
  return <Redirect to='/' push />;
}

function Account() {
  return (
    <Switch>
      <Route 
        path='/account/signup' 
        component={SignUp}
        exact
        />
      <Route 
        path='/account/login' 
        component={Login}
        exact
        />
      <Route 
        path='/account/logout' 
        component={Logout}
        exact
        />
    </Switch>
  );
}

export default Account;
