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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


function Fallback() {
    return <Redirect to='/' push />;
}

const THEME = createMuiTheme({
    palette: {
        primary: {
            main: '#FC5F21',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#9CCCAC',
            contrastText: '#000000'
        }
    },
    status: {
        danger: 'FC5F21',
    },
});


class App extends React.Component {

    render() {
        const DETAILVIEW = ({match}) => <Detail category={match.params.categoryId} eventID={match.params.eventId} />;
        const LISTVIEW = (props) => <ListView categoryId={props.match.params.categoryId} history={props.history} />;

        return (
            <MuiThemeProvider theme={THEME}>
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
                    path='/account'
                    component={Account}
                />
                <Route
                    path='/category/:categoryId'
                    component={LISTVIEW}
                    exact
                />
                <Route
                    path='/new'
                    component={CreateEvent}
                    exact
                />
                <Route
                    component={Fallback}
                />
                </Switch>
            </MuiThemeProvider>
        );
    }

}

export default App;
