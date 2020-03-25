import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    CircularProgress,
    LinearProgress
} from "@material-ui/core";

import FirebaseConnector from "../model/FirebaseConnector";
import EventPanel from "./EventPanel";
import FilterComponent from "../views/listView/FilterComponent";
import "../styles/eventList.css";

class ListView extends React.Component {
    

    constructor(props) {
        super(props);
        this.state={
            showFilterModal: false, 
            events: [], 
            category: null, 
            loading: true
        };

        this.db = new FirebaseConnector();

        this.getEvents = this.getEvents.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.handleFilterShow = this.handleFilterShow.bind(this);
        this.handleFilterDismiss = this.handleFilterDismiss.bind(this);
    }

    componentDidMount() {
        this.getEvents();
        this.getCategory();
    }

    async getEvents() {
        const { categoryId, limit } = this.props;
        let eventIds = await this.db.getEventIds(categoryId);
        const events = [];

        if (limit)
            eventIds = eventIds.slice(0, limit);
        for(const eventId of eventIds) {
            const event = await this.db.getEvent(categoryId, eventId);
            if(event)
                events.push(event);
        }

        this.setState({events});
    }

    async getCategory() {
        const category = await this.db.getCategory(this.props.categoryId);
        this.setState({category, loading: false});
    }

    handleFilterShow() {
        this.setState({showFilterModal: true});
    }

    handleFilterDismiss() {
        this.setState({showFilterModal: false});
    }

    render() {
        const { showHeader, showLinearProgress } = this.props;
        const { loading, showFilterModal, events, category } = this.state;
        return(
            <div className="eventlist-container">
                { loading && (showLinearProgress ? <LinearProgress color="secondary" /> : <CircularProgress color="secondary" />) }
                {!loading && <>
                    { showHeader && <>
                        <div className="headerSection">
                            <h2 className="headerCategory">
                                {category.name}
                            </h2>
                            <Button 
                                className="buttonRight" 
                                variant="contained" 
                                onClick={this.handleFilterShow}>
                                Filter
                            </Button>
                        </div>
                        <FilterComponent
                            visible={showFilterModal} 
                            dismissCallback={this.handleFilterDismiss}
                            />
                    </> }
                        <div className={"eventPanels"}>
                            {events.map(event => {
                                return (
                                    <EventPanel 
                                        key={event.id} 
                                        category={category} 
                                        event={event} 
                                        />
                                );
                            })}
                        </div>
                    </>
                }
            </div>
        );
    }
}

ListView.defaultProps = {
    categoryId: 'more',
    showHeader: false,
    showLinearProgress: false,
    limit: false
}

ListView.propTypes = {
    categoryId: PropTypes.string.isRequired,
    showHeader: PropTypes.bool,
    showLinearProgress: PropTypes.bool,
    limit: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
      ])
}

export default ListView;