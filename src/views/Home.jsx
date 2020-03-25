import React from 'react';
import { Link } from 'react-router-dom';
import {
    TextField,
    Typography
} from '@material-ui/core';
import CategoriesView from '../components/CategoriesView';
import NavBar from '../components/NavBar';
import EventList from '../components/EventList';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
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
                
                    <Typography variant="h4" className="title">Vorgeschlagen</Typography>
                    <EventList categoryId="more" limit={5} />
                </div>
                {/* Under construction stuff */}
                <div style={{ height: '150px' }}></div>
                <div>
                    <Typography variant="h5" style={{ textAlign: 'center' }}>Die Website befindet sich zurzeit noch im Bau. Geplante Events finden sie hier:</Typography>
                    <div style={{ height: '20px' }} />
                    <iframe 
                        title="calendar" 
                        src="https://calendar.google.com/calendar/embed?src=rk9prhknpf6f7umukseufkttsg%40group.calendar.google.com&ctz=Europe%2FBerlin" 
                        width="100%" 
                        height="600" 
                        frameBorder="0" 
                        scrolling="no" 
                        />
                </div>
                {/* Impressum */}
                <div className="categories center">
                    <Link to="/legal" push="true">Impressum</Link>
                </div>
            </>
        );
    }
}

export default Home;
