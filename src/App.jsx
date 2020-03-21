import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import './App.css';

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
        <Route
          component={Fallback} 
          />
      </Switch>
  );
}

export default App;
