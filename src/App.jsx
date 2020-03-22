import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Detail from './views/Detail';
import SignUp from './views/SignUp';
import Login from './views/Login';
import './App.css';
import Legal from './views/Legal';
import PrivacyPolicy from "./views/PrivacyPolicy";
import { logout } from './model/firebase_auth';
import ListView from "./views/listView/ListView";

function Fallback() {
  return <Redirect to='/' push />;
}

function Logout() {
  logout();
  return <Redirect to='/' push />;
}

function App() {
    const LISTVIEW = (props) => <ListView categoryId={props.match.params.categoryId} history={props.history}/>;
    return (
        <Switch>
            <Route
                path='/'
                component={Home}
                exact
            />
            <Route path='/detailtest'
                   component={Detail}
                   exact
            />
            <Route path='/category/:categoryId'
                   component={LISTVIEW}
            />
            <Route
                component={Fallback}
            />
        </Switch>
    );
  const DETAILVIEW = ({match}) => <Detail category={match.params.categoryId} eventID={match.params.eventId} />;

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
        component={Fallback}
        />
    </Switch>
  );
}

export default App;
