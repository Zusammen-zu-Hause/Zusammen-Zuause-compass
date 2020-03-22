import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import React, {cloneElement} from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import "./css/eventPanel.css"
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import * as _ from "lodash";
import FirebaseConnector from "../../model/FirebaseConnector";
import {Category} from "../../model/model";
import moment from "moment";
import "moment/locale/de"

interface EventPanelProps {
    category: Category,
    event: Event,
    expanded: boolean,
    callbackOnChange: (event: string) => void
}

interface EventPanelState {
}

export default class EventPanel extends React.Component<EventPanelProps, EventPanelState> {
    db = new FirebaseConnector();

    constructor(props: EventPanelProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.fullyBooked = this.fullyBooked.bind(this);
        moment.locale("de")
    }

    onClick() {
        let id = _.cloneDeep(this.props.event.id);
        this.props.callbackOnChange(id);
    }

    async fullyBooked() {
        let memberIds: string[] = await this.db.getMemberMails(this.props.category.id, this.props.event.id);
        return this.props.event.memberCount.max === memberIds.length;
    }

    render() {
        return(
            <Card className="card">
                <CardMedia
                    className="cover"
                    image={this.props.category.image}
                    title={this.props.category.id+"Img"}
                />
                <div className="details">
                    <CardContent className="content" onClick={this.onClick}>
                        {this.props.expanded ? <ExpandLess className={"arrow"}/> : <ExpandMore className={"arrow"}/>}
                        <Typography component="h5" variant="h5">
                            {this.props.event.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.event.institution}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {!this.fullyBooked() && "Keine freien Plätze!"}
                        </Typography>
                        <div className={"dateAndTime"}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {moment(this.props.event.startDate).format("dddd,  DD MMMM YYYY")}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {moment(this.props.event.startDate).format("HH:mm")} Uhr
                            </Typography>
                        </div>
                        <br/>
                        <Collapse in={this.props.expanded} timeout="auto" unmountOnExit className={"collapseText"}>
                            <br/>
                            <br/>
                            <Typography variant="subtitle1" color="textSecondary">
                                {this.props.event.shortDescription}
                            </Typography>
                        </Collapse>
                    </CardContent>
                </div>
            </Card>
        );
    }
}