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

const DETAILVIEW = ({match}) => <Detail category={match.params.categoryId} eventID={match.params.eventId} />;

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
      <Route path='/category/:categoryId/event/:eventId'
        component={DETAILVIEW}
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
