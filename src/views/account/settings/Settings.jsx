import React from 'react';
import  {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import NavBar from '../../../components/NavBar';
import { firebaseFirestore } from '../../../model/firebase';
import { getCurrentUser } from '../../../model/firebase_auth';

class SettingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.user = getCurrentUser();

        this.loadUser = this.loadUser.bind(this);
        this.save = this.save.bind(this);
        this.sendEmailVerification = this.sendEmailVerification.bind(this);
    }

    componentDidMount() {
        this.userDoc = firebaseFirestore().collection('users').doc(this.user.uid);
        this.loadUser();
    }

    async loadUser() {
        const doc = await this.userDoc.get();
        const userDocData = doc.data();
        this.setState({loadingCategories: false, name: userDocData['name'] || ''});
    }

    async save() {
        const { name } = this.state;
        getCurrentUser().updateProfile({
            displayName: name
        });
        await this.userDoc.update({ name: name });
    };

    sendEmailVerification() {
        this.user.sendEmailVerification()
    }

    textController = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { history } = this.props;
        const { name } = this.state;
        return (
            <>
                <NavBar history={history} />
                <div className="center">
                    <div className="authbox">
                        <Typography className="title" variant="h3">
                            Einstellungen
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            className="text-field"
                            value={name}
                            onChange={this.textController("name")}
                            fullWidth
                            required
                        />
                        <Button
                            className="text-field"
                            color="secondary"
                            variant="outlined"
                            onClick={this.save}
                            fullWidth
                        >
                            Speichern
                        </Button>
                        { !this.user.emailVerified && <Button
                            className="text-field"
                            color="secondary"
                            variant="outlined"
                            onClick={this.sendEmailVerification}
                            fullWidth
                        >
                            Email bestätigen
                         </Button> }
                        <Button
                            className="text-field"
                            color="secondary"
                            variant="contained"
                            onClick={() => history.push("/account/settings/categories")}
                            fullWidth
                            >
                                Kategorien bearbeiten
                            </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default SettingView;
