import React from 'react';
import PropTypes from 'prop-types';
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
import {
    firebaseAuth
} from '../model/firebase';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        firebaseAuth().onAuthStateChanged(user => this.setState({user}))
    }
    render() {
        const { user } = this.state;
        const { history } = this.props;
        return (
            <AppBar position="static" className="appbar" style={{position: "fixed", top: 0}}>
                <Toolbar>
                    <Typography onClick={() => history.push('/')} variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                    <Button color="#FFFFFF" variant="contained" onClick={() => history.push('/new')}>Erstelle ein Event</Button>
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

NavBar.propTypes = {
    history: PropTypes.any.isRequired
}

export default NavBar;
