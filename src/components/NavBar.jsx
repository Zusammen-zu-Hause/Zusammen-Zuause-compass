import React from 'react';
import  {
    AppBar,
    Button,
    Toolbar,
    Typography
} from '@material-ui/core';
import {getCurrentUser} from '../model/firebase_auth';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            categories: [],
            searchQuery: ''
        }
        this.user = getCurrentUser();

    }

    render() {
        const { history } = this.props;
        const { user } = this.state;
        console.log(user);
        return (
            <AppBar position="static" className="appbar">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                    <Button color="secondary" variant="contained">Erstelle ein ZzH Event</Button>
                    { user || (
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
