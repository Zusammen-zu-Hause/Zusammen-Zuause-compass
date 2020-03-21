import React from 'react';
import PropTypes from 'prop-types';
import  {
    Card,
    CardActionArea,
    Typography,
    CardContent
} from '@material-ui/core';


class CategoryCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {url, history} = this.props;
        history.push(url);
    }

    render() {
        const {title, image} = this.props;
        return (
            <Card className="category-card" style={{backgroundImage: 'url(' + image + ')'}}>
                <CardActionArea className="action-area" onClick={this.handleClick}>
                    <CardContent>
                        <Typography variant="h3" className="title">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

CategoryCard.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string.isRequired,
    history: PropTypes.any.isRequired
}

export default CategoryCard;
