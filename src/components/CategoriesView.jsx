import React from 'react';
import PropTypes from 'prop-types';
import  {
    CircularProgress
} from '@material-ui/core';
import CategoryCard from '../components/CategoryCard';
import FirebaseConnector from '../model/FirebaseConnector';



class CategoriesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingCategories: true,
            categories: []
        }
        this.firebaseConnector = new FirebaseConnector();

        this.loadCategories = this.loadCategories.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        const categoryNames = await this.firebaseConnector.getCategoryNames();
        const categories = [];
        for (const categoryName of categoryNames) {
            const category = await this.firebaseConnector.getCategory(categoryName);
            category['id'] = categoryName;
            categories.push(category);
        }
        this.setState({loadingCategories: false, categories});
    }

    onClick(category) {
        if(this.props.onClick) {
            this.props.onClick(category);
        }
    }

    render() {
        const {loadingCategories, categories} = this.state;
        return (
            <>
                { loadingCategories && <div className="center"><CircularProgress color="secondary" /></div> }
                <div  className="container">
                    { !loadingCategories && categories.map(category => {
                        return (
                            <CategoryCard 
                                key={category.name}
                                onClick={() => this.onClick(category.id)}
                                title={category.name}
                                image={category.image}
                                />
                        )
                    })}
                </div>
            </>
        );
    }
}

CategoriesView.propTypes = {
    onClick: PropTypes.func
}

export default CategoriesView;
