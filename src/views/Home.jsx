import React from 'react';
import  {
    TextField,
    Typography
} from '@material-ui/core';
import CategoriesView from '../components/CategoriesView';
import NavBar from '../components/NavBar';
import FirebaseConnector from '../model/FirebaseConnector';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
        this.firebaseConnector = new FirebaseConnector();

        this.loadCategories = this.loadCategories.bind(this);
    }

    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        const categoryIds = await this.firebaseConnector.getCategoryIds();
        const categories = [];
        for (const categoryId of categoryIds) {
            const category = await this.firebaseConnector.getCategory(categoryId);
            categories.push(category);
        }
        this.setState({loadingCategories: false, categories});
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };



    render() {
        const { history } = this.props;
        const { searchQuery } = this.state;
        return (
            <>
                <NavBar history={history} />
                <div className="search">
                    <div className="overlay center">
                        <div className="title">
                            <Typography variant="h3">Zusammen Begegnungen schaffen</Typography>
                            <Typography variant="h6">Eine Treffpunkt für Gleichgesinnte zum kulturellen Austausch oder um einfach nur online ein Bier zu trinken</Typography>
                        </div>
                        <TextField onChange={this.handleChange('searchQuery')} value={searchQuery} color="secondary" label="Suchen" variant="filled" className="search-box" />
                    </div>
                </div>
                <div className="categories">
                    <Typography variant="h4" className="title">Kategorien</Typography>
                    <CategoriesView onClick={category => history.push("/category/" + category)} />
                </div>
            </>
        );
    }
}

export default Home;
