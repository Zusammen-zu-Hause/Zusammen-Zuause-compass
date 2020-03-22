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
        if (this.props.onClick) {
            this.props.onClick();
        }
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

CategoryCard.deafultProps = {
    onClick: () => {}
}

CategoryCard.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    image: PropTypes.string.isRequired
}

export default CategoryCard;
