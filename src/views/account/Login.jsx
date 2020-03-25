import React from 'react';
import { Link } from 'react-router-dom';
import  {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

import { login } from '../../model/firebase_auth';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visibilePassword: true
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    }

    textController = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async handleSignIn(event) {
        event.preventDefault();
        const { history } = this.props;
        const { email, password } = this.state;
        await login(email, password);
        history.push("/");
    }

    togglePasswordVisibility() {
        const visibilePassword= !this.state.visibilePassword;
        this.setState({ visibilePassword });
    }

    render() {
        const { history } = this.props;
        const { email, password, visibilePassword } = this.state;
        return (
            <>
                <Toolbar>
                    <Typography  onClick={() => history.push('/')} variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                </Toolbar>
                <div className="center">
                    <div className="authbox">
                        <Typography className="title" variant="h3">
                            Anmelden
                        </Typography>
                        <form onSubmit={this.handleSignIn}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                className="text-field"
                                value={email}
                                onChange={this.textController("email")}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Passwort"
                                type={visibilePassword ? "password" : "text" }
                                variant="outlined"
                                className="text-field"
                                onChange={this.textController("password")}
                                value={password}
                                InputProps={{
                                    endAdornment: (<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {visibilePassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>)
                                }}
                                fullWidth
                                required
                            />
                            <Button
                                className="text-field"
                                color="secondary"
                                type="submit"
                                variant="outlined"
                                fullWidth
                            >
                                Anmelden
                            </Button>
                        </form>
                        <Typography className="text"><Link to="/account/forgotten" push="true">Passwort vergessen?</Link></Typography>
                        <hr />
                        <Typography className="text">Noch kein Mitglied? <Link to="/account/signup" push="true">Registrieren</Link></Typography>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
