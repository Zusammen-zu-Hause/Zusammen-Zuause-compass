import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Collapse,
    Typography,
    IconButton
} from "@material-ui/core";
import {
    ExpandLess, 
    ExpandMore
} from "@material-ui/icons";
import moment from "moment";
import "moment/locale/de";
import FirebaseConnector from "../model/FirebaseConnector";
import {Category, Institution} from "../model/model";
import "../styles/eventPanel.css";

interface EventPanelProps {
    category: Category,
    event: Event,
    callbackOnChange: (event: string) => void
}

interface EventPanelState {
    fullyBooked: boolean,
    expanded: boolean,
    institution: string
}

export default class EventPanel extends React.Component<EventPanelProps, EventPanelState> {
    db = new FirebaseConnector();

    constructor(props: EventPanelProps) {
        super(props);
        this.state = {
            fullyBooked: false,
            expanded: false,
            institution: ""
        };
        moment.locale("de");

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.fullyBooked = this.fullyBooked.bind(this);
        this.getInstitutionName = this.getInstitutionName.bind(this);
    }

    componentDidMount(): void {
        this.fullyBooked();
        this.getInstitutionName();
    }

    toggleExpanded() {
        const expanded= !this.state.expanded;
        this.setState({ expanded });
    }

    async fullyBooked(): boolean {
        let memberIds: string[] = await this.db.getMemberMails(this.props.category.id, this.props.event.id);
        this.setState({fullyBooked: this.props.event.memberCount.max === memberIds.length});
    }

    async getInstitutionName(): string {
        const institution: Institution = await this.db.getInstitution(this.props.event.institutionId);
        this.setState({institution: institution.name});
    }

    render() {
        const { category, event } = this.props;
        const { expanded } = this.state;
        return(
            <Card className="eventpanel-card">
                <CardMedia
                    className="cover"
                    image={category.image}
                    title={category.id+"Img"}
                />
                <div className="details">
                    <CardContent className="content" onClick={this.toggleExpanded}>
                        <IconButton className="arrow">{ expanded ? <ExpandLess /> : <ExpandMore /> }</IconButton>
                        <Typography component="h5" variant="h5">
                            {event.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.state.institution}
                        </Typography>
                        <Typography variant="subtitle1" color="error" >
                            {this.state.fullyBooked && "Keine freien Plätze!"}
                        </Typography>
                        <div className={"dateAndTime"}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {moment(event.startDate).format("dddd,  DD MMMM YYYY")}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {moment(event.startDate).format("HH:mm")} Uhr
                            </Typography>
                        </div>
                        <br/>
                        <Collapse in={expanded} timeout="auto" unmountOnExit className="collapseText">
                            <br/>
                            <br/>
                            <Typography variant="subtitle1" color="textSecondary">
                                {event.shortDescription}
                            </Typography>
                            { event.isPublic && <Button variant="contained" color="primary" href={event.eventLink} fullWidth>Zum Event</Button> }
                        </Collapse>
                    </CardContent>
                </div>
            </Card>
        );
    }
}