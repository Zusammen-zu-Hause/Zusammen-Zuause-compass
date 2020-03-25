import React from "react";

import NavBar from "../../components/NavBar";
import EventList from "../../components/EventList";
import "../../styles/eventList.css";

export default class ListView extends React.Component {

    render() {
        const { history, categoryId } = this.props;
        return(
            <div className="eventlist-container">
                <NavBar history={history}/>
                <EventList 
                    categoryId={categoryId} 
                    showHeader 
                    showLinearProgress
                    />
            </div>
        );
    }
}
