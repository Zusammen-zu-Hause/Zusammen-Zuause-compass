import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Settings from './settings';
import { 
  logout,
  getCurrentUser 
} from '../../model/firebase_auth';

function Logout() {
  logout();
  return <Redirect to='/' push />;
}

function Account() {
  const user = getCurrentUser();
  const SETTINGS = () => {
    if (user)
      return <Settings />;
    return <Redirect to='/' push />;
  }

  return (
    <Switch>
        <Route 
            path='/account/signup' 
            component={SignUp}
            exact
            />
        <Route 
            path='/account/forgotten' 
            component={ForgotPassword}
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
        <Route 
            path='/account/settings' 
            component={SETTINGS}
            />
    </Switch>
  );
}

export default Account;
