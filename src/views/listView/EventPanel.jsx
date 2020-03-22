import React from "react";
import Typography from "@material-ui/core/Typography";
import "./css/eventPanel.css"
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import * as _ from "lodash";
import FirebaseConnector from "../../model/FirebaseConnector";
import {Category, Institution} from "../../model/model";
import moment from "moment";
import "moment/locale/de"

interface EventPanelProps {
    category: Category,
    event: Event,
    expanded: boolean,
    callbackOnChange: (event: string) => void
}

interface EventPanelState {
    fullyBooked: boolean,
    institution: string
}

export default class EventPanel extends React.Component<EventPanelProps, EventPanelState> {
    db = new FirebaseConnector();

    constructor(props: EventPanelProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.fullyBooked = this.fullyBooked.bind(this);
        this.state = {fullyBooked: false, institution: ""};
        moment.locale("de");
    }

    componentDidMount(): void {
        this.fullyBooked();
        this.getInstitutionName();
    }

    onClick() {
        let id = _.cloneDeep(this.props.event.id);
        this.props.callbackOnChange(id);
    }

    async fullyBooked(): boolean {
        let memberIds: string[] = await this.db.getMemberMails(this.props.category.id, this.props.event.id);
        this.setState({fullyBooked: this.props.event.memberCount.max === memberIds.length});
    }

    async getInstitutionName(): string {
        let institution: Institution = await this.db.getInstitution(this.props.event.institutionId);
        this.setState({institution: ''});
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
                            {this.state.institution}
                        </Typography>
                        <Typography variant="subtitle1" color="error" >
                            {this.state.fullyBooked && "Keine freien Plätze!"}
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