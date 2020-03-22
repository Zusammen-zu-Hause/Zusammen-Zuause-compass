import React from 'react';
import  {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Settings
} from '@material-ui/icons';
import {getCurrentUser} from '../model/firebase_auth';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            categories: [],
            searchQuery: ''
        }
    }

    render() {
        const { history } = this.props;
        const user = getCurrentUser();
        return (
            <AppBar position="static" className="appbar" style={{position: "fixed", top: 0}}>
                <Toolbar>
                    <Typography onClick={() => history.push('/')} variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                    <Button color="secondary" variant="contained" onClick={() => history.push('/create')}>Erstelle ein Event</Button>
                    { user ? (
                        <>
                            <IconButton color="inherit" onClick={() => history.push('/account/settings')}><Settings /></IconButton>
                            <Button color="inherit" onClick={() => history.push('/account/logout')}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => history.push('/account/login')}>Login</Button>
                            <Button color="inherit" onClick={() => history.push('/account/signup')}>Registrieren</Button>
                        </>
                    ) }
                    
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;
