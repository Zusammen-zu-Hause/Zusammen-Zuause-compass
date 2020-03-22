import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingsView from './Settings';
import CategoriesSettings from './CategoriesSettings';

function Account() {
  return (
    <Switch>
      <Route 
        path='/account/settings' 
        component={SettingsView}
        exact
        />
      <Route 
        path='/account/settings/categories' 
        component={CategoriesSettings}
        exact
        />
    </Switch>
  );
}

export default Account;
