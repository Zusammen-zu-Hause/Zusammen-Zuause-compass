import React from 'react';
import  {
    Button,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';

import { resetPassword } from '../../model/firebase_auth';


class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.handleForgotPassword = this.handleForgotPassword.bind(this);
    }

    textController = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async handleForgotPassword(event) {
        event.preventDefault();
        const { history } = this.props;
        const { email } = this.state;
        await resetPassword(email);
        history.push("/");
    }
    render() {
        const { history } = this.props;
        const { email } = this.state;
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
                            Password vergessen
                        </Typography>
                        <form onSubmit={this.handleForgotPassword}>
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
                            <Button
                                className="text-field"
                                color="secondary"
                                type="submit"
                                variant="outlined"
                                fullWidth
                            >
                                Zurücksetzen
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default ForgotPassword;
