import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { Event, Member } from '../model/model';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Booking from './Booking';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/Detail.css';
import FirebaseConnector from "../model/FirebaseConnector";

const containerClass = "detailview container";
const itemClass = "detailview item";
const titleClass = "detailview item title";
const closeClass = "detailview close";
const closeIconClass = "detailview closeicon";
const closeIconSpaceClass = "detailview closeiconspace";
const mainnameClass = "detailview mainname";
const timeClass = "detailview time";
const nameClass = "detailview name";
const descClass = "detailview description";
const checkboxClass = "detailview checkbox";
const sliderNotReachedClass = "detailview sliderNotReached";
const sliderReachedClass = "detailview sliderReached";
const buttonClass = "detailview button";
const loadingClass = "detailview loading";

const checkedBox = <Checkbox checked />;
const uncheckedBox = <Checkbox />;

const bookingError = <Typography className="error">Buchungsfehler!</Typography>;
const bookingSuccess = <Typography className="success">Buchung erfolgreich!</Typography>;

const slider = (value, MIN, MAX) => (value - MIN) * 100 / (MAX - MIN);

const getPriceStr = (event) => {
    if (event.financial.mandatory) {
        return event.financial.price + "€";
    } else if (event.financial.price > 0) {
        return "Spenden in Höhe von " + event.financial.price + "€ erwünscht";
    } else {
        return "Spenden erwünscht";
    }

};

class Detail extends React.Component {

    closeBooking = () => {
        this.setState({
            showBooking: false
        });
    };
    openBooking = () => {
        this.setState({
            showBooking: true,
            bookingSuccess: false,
            bookingError: false,
        });
    };
    constructor(...args) {
        super(...args);
        this.state = {
            showBooking: false,
            bookingSuccess: false,
            bookingError: false,
            eventFound: false,
            eventGot: false,
            event: null,
            membermails: null,
        };
        this.bookingSuccess = this.bookingSuccess.bind(this);
        console.log(this.props.category + "  -  " + this.props.eventID);
    }

    componentDidMount() {
        if (this.props.category === undefined || this.props.eventID === undefined) {
            this.getDemoEvent();
        } else {
            this.getEvent();
        }
    }

    async getDemoEvent() {
        await this.setState({
            event: new Event(
                "none",
                {
                    blind: true,
                    childFriendly: true,
                    deaf: false,
                    interactive: false,
                    physicalDisabled: true,
                    together: true
                },
                { min: 0, max: 12 },
                "2020-03-20T17:00:00.00+01:00",
                "Diese seite wurde fehlerhaft aufgerufen! Sollte dies ein Fehler sein, kontaktiere bitte den Support.",
                { price: "42069", mandatory: false },
                "ZusammenZuHause",
                "",
                { min: 3, max: 20 },
                "2020-04-20T17:00:00.00+01:00",
                "Diese Seite wurde fehlerhaft aufgerufen",
                "Dieses Event existiert nicht",
                [{
                    name: "none",
                    email: "mail@example.com"
                }]
            ),
            eventFound: true,
            eventGor: true
        });
        await this.forceUpdate();
    }

    async getEvent() {
        let db = new FirebaseConnector();
        let e = await db.getEvent(this.props.category, this.props.eventID);
        if (e != null) {
            let mm = await db.getMemberMails(this.props.category, this.props.eventID);
            let mems: Member[] = [];
            for (let m of mm) {
                let member = await db.getMember(this.props.category, this.props.eventID, m);
                if (member != null) {
                    mems.push(member);
                }
            }
            e.members = mems;

            await this.setState({
                eventFound: true,
                event: e
            });
        }
        await this.setState({
            eventGot: true
        });
        await this.forceUpdate();
    }

    bookingSuccess() {
        this.setState({ bookingSuccess: true });
        this.closeBooking();
        let e = this.state.event;
        e.members.push({ id: "self", email: "self@example.com", name: "self" });
        this.setState({

        });
    }

    bookingError = () => {
        this.setState({ bookingError: true });
        this.closeBooking();
    }

    render() {
        let event = this.state.event;

        if (this.state.eventGot && !this.state.eventFound) {
            return (
                <Typography className="error">Event nicht gefunden!</Typography>
            );
        }
        if (this.state.showBooking) {
            return <Booking category={this.props.category} eventID={this.props.eventID} onClose={this.closeBooking} onSuccess={this.bookingSuccess} onError={this.bookingError} max={this.state.event.memberCount.max}></Booking>;
        } else {
            if (!this.state.eventGot) {
                return (<CircularProgress className={loadingClass} color="primary" />);
            } else {
                return (
                    <>
                        {this.state.bookingSuccess ? bookingSuccess : ""}
                        {this.state.bookingError ? bookingError : ""}
                        <Grid container className={containerClass} spacing={0}>
                            <Fab size="small" color="secondary" aria-label="add" className={closeClass} onClick={this.props.onClose}>
                                <div className={closeIconClass}></div>
                            </Fab>
                            <Grid item xs={12}>
                                <Paper className={titleClass}>
                                    <div className={closeIconSpaceClass}></div>
                                    <Typography className={mainnameClass}>{event.title}</Typography>
                                    <Typography className={timeClass}>{event.startDate}</Typography>
                                    <Typography className={timeClass}>{event.age.min + "-" + event.age.max + " Jahre (" + (event.additional.childrenFriendly ? "" : "nicht ") + "geeignet für Kinder)"}</Typography>
                                    <Typography className={timeClass}>{getPriceStr(event)}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={itemClass}>
                                    <Typography className={nameClass}>Beschreibung</Typography>
                                    <Typography className={descClass}>{event.description}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={itemClass}>
                                    <Typography className={nameClass}>Kurzbeschreibung</Typography>
                                    <Typography className={descClass}>{event.shortDescription}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={itemClass}>
                                    <Typography className={nameClass}>Teilnehmer: {event.members.length + "/" + event.memberCount.max}</Typography>
                                    <LinearProgress variant="buffer" className={event.members.length >= event.memberCount.min ? sliderReachedClass : sliderNotReachedClass} value={slider(event.members.length, 0, event.memberCount.max)} valueBuffer={slider(event.memberCount.min, 0, event.memberCount.max)} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={itemClass}>
                                    <FormControlLabel className={checkboxClass} disabled control={event.additional.blind ? checkedBox : uncheckedBox} label="Blind" /><br />
                                    <FormControlLabel className={checkboxClass} disabled control={event.additional.deaf ? checkedBox : uncheckedBox} label="Taub" /><br />
                                    <FormControlLabel className={checkboxClass} disabled control={event.additional.physicalDisabled ? checkedBox : uncheckedBox} label="körperlich behindert" /><br />
                                    <FormControlLabel className={checkboxClass} disabled control={event.additional.interactive ? checkedBox : uncheckedBox} label="interaktiv" /><br />
                                    <FormControlLabel className={checkboxClass} disabled control={event.additional.together ? checkedBox : uncheckedBox} label="zusammen" /><br />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={itemClass}>
                                    <Typography className={nameClass}>Institution</Typography>
                                    <Typography className={descClass}>{event.institution}</Typography>
                                </Paper>
                            </Grid>
                            {
                                event.members.length < event.memberCount.max ?
                                    <Button className={buttonClass} color="primary" variant="contained" onClick={this.openBooking}>Buchen</Button>
                                    :
                                    <Button className={buttonClass} color="primary" variant="contained" onClick={this.openBooking} disabled>Buchen</Button>
                            }
                        </Grid>
                    </>
                );
            }
        }
    }
}

export default Detail;