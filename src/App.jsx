import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Detail from './views/Detail';
import SignUp from './views/SignUp';
import './App.css';
import Legal from './views/Legal';
import PrivacyPolicy from "./views/PrivacyPolicy";

function Fallback() {
  return <Redirect to='/' push />;
}

function App() {
  return (
    <Switch>
      <Route
        path='/'
        component={Home}
        exact
      />
      <Route path='/legal'
        component={Legal}
        exact
      />
      <Route path='/legal/privacy-policy'
        component={PrivacyPolicy}
        exact
      />
      <Route path='/detailtest'
        component={Detail}
        exact
      />
      <Route 
        path='/account/signup' 
        component={SignUp}
        exact
        />
      <Route
        component={Fallback}
        />
    </Switch>
  );
}

export default App;
