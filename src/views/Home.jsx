import React from 'react';
import  {
    AppBar,
    Button,
    CircularProgress,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import CategoryCard from '../components/CategoryCard';
import FirebaseConnector from '../model/FirebaseConnector';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            categories: []
        }
        this.firebaseConnector = new FirebaseConnector();

        this.loadCategories = this.loadCategories.bind(this);
    }

    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        const categoryNames = await this.firebaseConnector.getCategoryNames();
        const categories = [];
        for (const categoryName of categoryNames) {
            const category = await this.firebaseConnector.getCategory(categoryName);
            categories.push(category);
        }
        this.setState({loadingCategories: false, categories});
    }

    render() {
        const { history } = this.props;
        const { loadingCategories, categories } = this.state;
        return (
            <>
                <AppBar position="static" className="appbar">
                    <Toolbar>
                        <Typography variant="h6" className="title">
                            Zusammen zu Hause
                        </Typography>
                        <Button color="secondary" variant="contained">Erstelle ein ZzH Event</Button>
                        <Button color="inherit" onClick={() => history.push('/account/login')}>Login</Button>
                        <Button color="inherit" onClick={() => history.push('/account/register')}>Registrieren</Button>
                    </Toolbar>
                </AppBar>
                <div className="search center">
                    <div className="title">
                        <Typography variant="h4">Zusammen Begegnungen schaffen</Typography>
                        <Typography variant="body1">Eine Treffpunkt für Gleichgesinnte zum kulturellen Austausch oder um einfach nur online ein Bier zu trinken</Typography>
                    </div>
                    <TextField color="secondary" label="Suchen" variant="filled" className="search-box" />
                </div>
                <div className="categories">
                    <Typography variant="h4" className="title">Kategorien</Typography>
                    { loadingCategories && <div className="center"><CircularProgress color="secondary" /></div> }
                    
                    { !loadingCategories && categories.map(category => {
                        return (
                            <CategoryCard 
                                key={category.name}
                                title={category.name}
                                url={'/category/' + category.name}
                                image={category.image}
                                history={history}
                                />
                        )
                    })}

                    
                </div>
            </>
        );
    }
}

export default Home;
