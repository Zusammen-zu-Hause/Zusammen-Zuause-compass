import React from 'react';
import { Link } from 'react-router-dom';
import  {
    Avatar,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Done,
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

import CategoriesView from '../components/CategoriesView';
import { register, getCurrentUser } from '../model/firebase_auth';
import { firebaseFirestore } from '../model/firebase';

function getSteps() {
    return ['Perönliche Informationen', 'Kategorien', 'Fertig'];
}

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visibilePassword: true,
            activeStep: 0,
            selectedCategories: [],
            user: null
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSaveCategories = this.handleSaveCategories.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleSelectedCategories = this.toggleSelectedCategories.bind(this);

        this.steps = getSteps();
    }

    textController = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async handleSignUp(event) {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = await register(email, password);
        user.user.updateProfile({
            displayName: name,
        });
        this.setState({activeStep: 1, user: user.user});
    }

    async handleSaveCategories() {
        const { user, selectedCategories } = this.state;
        console.log(getCurrentUser());
        firebaseFirestore().collection('user').doc(user.uid).set({
            "name": user.displayName,
            "categories": selectedCategories
        });
        this.setState({activeStep: 2});
    }

    togglePasswordVisibility() {
        const visibilePassword= !this.state.visibilePassword;
        this.setState({ visibilePassword });
    }

    toggleSelectedCategories(category) {
        const selectedCategories = this.state.selectedCategories;
        if(selectedCategories.includes(category)) {
            selectedCategories.splice(selectedCategories.indexOf(category), 1);
        } else {
            selectedCategories.push(category);
        }
        this.setState({selectedCategories});
    }

    render() {
        const { history } = this.props;
        const { name, email, password, visibilePassword, activeStep, selectedCategories, user } = this.state;
        return (
            <>
                <Toolbar>
                    <Typography variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                </Toolbar>
                <div className="center">
                    <div className="authbox">
                        <Typography className="title" variant="h3">
                            Registrieren
                        </Typography>
                        <Stepper className="stepper" activeStep={activeStep}>
                            {this.steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                    { activeStep === 0 && (
                        <div className="authbox">
                            <form onSubmit={this.handleSignUp}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    className="text-field"
                                    value={name}
                                    onChange={this.textController("name")}
                                    fullWidth
                                    required
                                />
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
                                    Weiter
                                </Button>
                            </form>
                            <Typography className="text-field text">Wenn du auf "Weiter" drückst, akzeptiertst du unser <Link>Code of Conduct</Link> und unser <Link>Datenschutzbestimmungen</Link></Typography>
                            <hr />
                            <Typography className="text">Schon Mitglied? <Link to="/account/login" push="true">Anmelden</Link></Typography>
                        </div>
                    ) }
                    { activeStep === 1 && (
                        <div className="categories">
                            <Typography variant="h4" className="title">Kategorien</Typography>
                            <Typography variant="h6" className="title">Wähle bitte einige deiner Lieblingskategorien aus</Typography>
                            <div className="container">
                                <Button 
                                    className="button" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onClick={this.handleSaveCategories}>
                                    Fertig
                                </Button>
                            </div>
                            <CategoriesView onClick={category => this.toggleSelectedCategories(category)} selected={selectedCategories}/>
                        </div>
                    ) }
                    { activeStep === 2 && (
                        <>
                            <Typography variant="h4" className="title">Willkommen {user.displayName}</Typography>
                            <Avatar style={{ margin: 30, width: 85, height: 85 }}>
                                <Done style={{ fontSize: 80 }} />
                            </Avatar>
                            <Button onClick={() => history.push("/")}>Zurück zu den Events</Button>
                        </>
                    ) }
                </div>
            </>
        );
    }
}

export default SignUp;
