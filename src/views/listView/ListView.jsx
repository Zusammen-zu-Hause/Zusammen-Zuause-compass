import * as React from "react";
import {
    Button,
    LinearProgress
} from "@material-ui/core";

import FirebaseConnector from "../../model/FirebaseConnector";
import {Category} from "../../model/model";
import NavBar from "../../components/NavBar";
import EventPanel from "./EventPanel";
import FilterComponent from "./FilterComponent";
import "./css/listView.css";

interface ListViewProps {
    categoryId: string,
    history: any
}

interface ListViewState {
    showFilterModal: boolean,
    events: Event[],
    category: Category,
    loading: boolean
}

export default class ListView extends React.Component<ListViewProps, ListViewState> {
    db = new FirebaseConnector();

    constructor(props: ListViewProps) {
        super(props);
        this.state={
            showFilterModal: false, 
            events: [], 
            category: null, 
            loading: true
        };

        this.getEvents = this.getEvents.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.handleFilterShow = this.handleFilterShow.bind(this);
        this.handleFilterDismiss = this.handleFilterDismiss.bind(this);
    }

    componentDidMount(): void {
        this.getEvents();
        this.getCategory();
    }

    async getEvents() {
        let eventIds = await this.db.getEventIds(this.props.categoryId);
        let events: Event[] = [];

        for(let eventId of eventIds) {
            let event: Event = await this.db.getEvent(this.props.categoryId, eventId);
            if(event)
                events.push(event);
        }

        this.setState({events});
    }

    async getCategory() {
        let category: Category = await this.db.getCategory(this.props.categoryId);
        this.setState({category, loading: false});
    }

    handleFilterShow() {
        this.setState({showFilterModal: true});
    }

    handleFilterDismiss() {
        this.setState({showFilterModal: false});
    }

    render() {
        const { history } = this.props;
        const { loading, showFilterModal, events, category } = this.state;
        return(
            <div className={"listView"}>
                <NavBar history={history}/>
                { loading && <LinearProgress color="secondary" /> }
                {!loading && <>
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
