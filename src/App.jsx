import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Detail from './views/Detail';
import './App.css';
import ListView from "./views/listView/ListView";

function Fallback() {
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
}

export default App;
