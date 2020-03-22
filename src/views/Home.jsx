import React from 'react';
import  {
    AppBar,
    Button,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import CategoriesView from '../components/CategoriesView';
import NavBar from '../components/NavBar';
import FirebaseConnector from '../model/FirebaseConnector';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            categories: [],
            searchQuery: ''
        }
        this.firebaseConnector = new FirebaseConnector();

        this.loadCategories = this.loadCategories.bind(this);
    }

    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        const categoryNames = await this.firebaseConnector.getCategoryIds();
        const categories = [];
        for (const categoryName of categoryNames) {
            const category = await this.firebaseConnector.getCategory(categoryName);
            categories.push(category);
        }
        this.setState({loadingCategories: false, categories});
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };



    render() {
        const { history } = this.props;
        const { loadingCategories, categories, searchQuery } = this.state;
        return (
            <>
                <NavBar history={history} />
                <div className="search">
                    <div className="overlay center">
                        <div className="title">
                            <Typography variant="h4">Zusammen Begegnungen schaffen</Typography>
                            <Typography variant="body1">Eine Treffpunkt für Gleichgesinnte zum kulturellen Austausch oder um einfach nur online ein Bier zu trinken</Typography>
                        </div>
                        <TextField onChange={this.handleChange('searchQuery')} value={searchQuery} color="secondary" label="Suchen" variant="filled" className="search-box" />
                    </div>
                </div>
                <div className="categories">
                    <Typography variant="h4" className="title">Kategorien</Typography>
                    <CategoriesView 
                        onClick={category => history.push("/category/" + category)}
                        />
                </div>
            </>
        );
    }
}

export default Home;
