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
    componentDidMount() {
        this.user = getCurrentUser();
    }

    render() {
        const { history } = this.props;
        return (
            <AppBar position="static" className="appbar" style={{position: "fixed", top: 0}}>
                <Toolbar>
                    <Typography onClick={() => history.push('/')} variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                    <Button color="#FFFFFF" variant="contained" onClick={() => history.push('/new')}>Erstelle ein Event</Button>
                    { this.user ? (
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
