import * as React from "react";
import "./css/listView.css"
import Button from "@material-ui/core/Button";
import FilterComponent from "./FilterComponent";
import FirebaseConnector from "../../model/FirebaseConnector";
import NavBar from "../../components/NavBar";
import EventPanel from "./EventPanel";
import {exampleEvent} from "../../examplesAPI";
import {Category} from "../../model/model";
import {LinearProgress} from "@material-ui/core";

interface ListViewProps {
    categoryId: string,
    history: any
}

interface ListViewState {
    showFilterModal: boolean,
    expandedPanel: string,
    events: Event[],
    category: Category,
    loading: boolean
}

export default class ListView extends React.Component<ListViewProps, ListViewState> {
    db = new FirebaseConnector();

    constructor(props: ListViewProps) {
        super(props);
        this.handleFilterShow = this.handleFilterShow.bind(this);
        this.handleFilterDismiss = this.handleFilterDismiss.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.changeExpandedPanel = this.changeExpandedPanel.bind(this);
        this.state={showFilterModal: false, expandedPanel: "", events: [], category: null, loading: true};
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

    changeExpandedPanel(eventId: string) {
        if(this.state.expandedPanel === eventId) {
            this.setState({expandedPanel: "eventId"});
        } else {
            this.setState({expandedPanel: eventId});
        }
    }

    render() {

        return(
            <div className={"listView"}>
                <NavBar history={this.props.history}/>
                {this.state.loading && <LinearProgress />}
                {!this.state.loading && <>
                    <div className={"headerSection"}>
                        <h2 className="headerCategory">
                            {this.state.category.name}
                        </h2>
                        <Button className={"buttonRight"} variant="contained" onClick={this.handleFilterShow}>Filter</Button>
                    </div>
                    <FilterComponent visible={this.state.showFilterModal} dismissCallback={this.handleFilterDismiss}/>
                    {this.state.events.map(event => {
                        return (
                            <EventPanel category={this.state.category} event={event} expanded={this.state.expandedPanel === event.id} callbackOnChange={this.changeExpandedPanel}/>
                        );
                    })}
                    </>
                }
            </div>
        );
    }
}
