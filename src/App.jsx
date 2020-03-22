import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Detail from './views/Detail';
import ListView from "./views/listView/ListView";
import Account from './views/account';
import CreateEvent from './views/CreateEvent';
import './App.css';
import Legal from './views/Legal';
import PrivacyPolicy from "./views/PrivacyPolicy";
import './App.css';

function Fallback() {
    return <Redirect to='/' push />;
}

function App() {
  const DETAILVIEW = ({match}) => <Detail category={match.params.categoryId} eventID={match.params.eventId} />;
  const LISTVIEW = (props) => <ListView categoryId={props.match.params.categoryId} history={props.history} />;    

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
      <Route path='/account' component={Account} />
      <Route 
        path='/category/:categoryId'
        component={LISTVIEW}
        />
      <Route
        path='/create'
        component={CreateEvent}
        exact
      />
      <Route
        component={Fallback}
      />
    </Switch>
  );
}

export default App;