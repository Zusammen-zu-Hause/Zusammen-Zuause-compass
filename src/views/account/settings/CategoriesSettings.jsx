import React from 'react';
import  {
    Button,
    CircularProgress,
    Typography
} from '@material-ui/core';
import CategoriesView from '../../../components/CategoriesView';
import NavBar from '../../../components/NavBar';
import FirebaseConnector from '../../../model/FirebaseConnector';
import { firebaseFirestore } from '../../../model/firebase';
import { getCurrentUser } from '../../../model/firebase_auth';

class CategoriesSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            selectedCategories: []
        }
        this.firebaseConnector = new FirebaseConnector();

        this.loadUser = this.loadUser.bind(this);
        this.save = this.save.bind(this);
        this.toggleSelectedCategories = this.toggleSelectedCategories.bind(this);
    }

    componentDidMount() {
        const user = getCurrentUser();
        this.userDoc = firebaseFirestore().collection('users').doc(user.uid);
        this.loadUser();
    }

    async loadUser() {
        const doc = await this.userDoc.get();
        const userDocData = doc.data();
        this.setState({loadingCategories: false, selectedCategories: userDocData['categories'] || []});
    }

    async save() {
        const { selectedCategories } = this.state;
        await this.userDoc.update({ categories: selectedCategories });
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };

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
        const { selectedCategories, loadingCategories } = this.state;
        const user = getCurrentUser();
        console.log(user);
        return (
            <>
                <NavBar history={history} />
                <div className="categories">
                    <Typography variant="h4" className="title">Kategorien</Typography>
                    { loadingCategories && <div className="center"><CircularProgress color="secondary" /></div> }
                    { !loadingCategories && (
                        <div className="container">
                            <Button 
                                className="button" 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => history.push("/account/settings")}>
                                    Zurück
                                </Button>
                            <Button 
                                className="button" 
                                variant="outlined" 
                                color="secondary" 
                                onClick={this.save}>
                                    Speichern
                                </Button>
                            <CategoriesView onClick={category => this.toggleSelectedCategories(category)} selected={selectedCategories}/>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default CategoriesSettings;
