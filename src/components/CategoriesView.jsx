import React from 'react';
import PropTypes from 'prop-types';
import  {
    CircularProgress
} from '@material-ui/core';
import  {
    Done
} from '@material-ui/icons';
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
        const { selected } = this.props;
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
                                title={selected.includes(category.id) ? <Done style={{ fontSize: 70 }} /> : category.name}
                                image={category.image}
                                />
                        )
                    })}
                </div>
            </>
        );
    }
}

CategoriesView.defaultProps = {
    onClick: () => {},
    selected: []
}

CategoriesView.propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.string)
}

export default CategoriesView;
