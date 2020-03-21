import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { Event } from '../model/model';
import LinearProgress from '@material-ui/core/LinearProgress';
//import FirebaseConnector from "../model/FirebaseConnector";


const containerClass = "detailview container";
const itemClass = "detailview item";
const titleClass = "detailview item title";
const closeClass = "detailview close";
const mainnameClass = "detailview mainname";
const timeClass = "detailview time";
const nameClass = "detailview name";
const descClass = "detailview description";
const checkboxClass = "detailview checkbox";
const sliderNotReachedClass = "detailview sliderNotReached";
const sliderReachedClass = "detailview sliderReached";

const checkedBox = <Checkbox checked />;
const uncheckedBox = <Checkbox />;

const exev = new Event(
    "HGFVBNJKTFGHDMNBGYJK",
    "MegaEvent",
    { min: 0, max: 12 },
    true,
    "2020-03-20T17:00:00.00+01:00",
    "This is a example category",
    { price: "0", mandatory: false },
    { blind: false, deaf: true, physicalDisabled: false, educationallyDisabled: false },
    "Example Institution",
    false,
    "src/logo",
    { min: 7, max: 10 },
    "2020-04-20T17:00:00.00+01:00",
    "Beste Kunstauffstellung der welt",
    false,
    [{
        name: "hans",
        email: "mail@mail.de"
    }, {
        name: "hans",
        email: "mail@mail.de"
    }, {
        name: "hans",
        email: "mail@mail.de"
    }, {
        name: "hans",
        email: "mail@mail.de"
    }, {
        name: "hans",
        email: "mail@mail.de"
    }, {
        name: "hans",
        email: "mail@mail.de"
    }]
);

const slider = (value, MIN, MAX) => (value - MIN) * 100 / (MAX - MIN);

class Detail extends React.Component {


    render() {
        //let event = new FirebaseConnector().getEvent(this.props.category, this.props.id);
        let event = exev;
        if (event == null) {
            return (
                <Typography className="error">Event nicht gefunden!</Typography>
            );
        }

        return (
            <>
                <Fab size="small" color="secondary" aria-label="add" className={closeClass}>
                    <Typography>X</Typography>
                </Fab>
                <Grid container className={containerClass} spacing={0}>
                    <Grid item xs={12}>
                        <Paper className={titleClass}>
                            <Typography className={mainnameClass}>{event.name}</Typography>
                            <Typography className={mainnameClass}>{event.title}</Typography>
                            <Typography className={timeClass}>{event.startDate}</Typography>
                            <Typography className={timeClass}>{event.age.min + "-" + event.age.max + " Jahre (" + (event.childrenFriendly ? "" : "nicht ") + "geeignet für Kinder)"}</Typography>
                            <Typography className={timeClass}>{event.financial.price + "€"}</Typography>
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
                            <Typography className={nameClass}>Teilnehmer: {event.members.length + "/" + event.memberCount.max}</Typography>
                            <LinearProgress variant="buffer" className={event.members.length >= event.memberCount.min ? sliderReachedClass : sliderNotReachedClass} value={slider(event.members.length, 0, event.memberCount.max)} valueBuffer={slider(event.memberCount.min, 0, event.memberCount.max)} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <FormControlLabel className={checkboxClass} disabled control={event.handicap.blind ? checkedBox : uncheckedBox} label="Blind" /><br />
                            <FormControlLabel className={checkboxClass} disabled control={event.handicap.deaf ? checkedBox : uncheckedBox} label="Taub" /><br />
                            <FormControlLabel className={checkboxClass} disabled control={event.handicap.educationallyDisabled ? checkedBox : uncheckedBox} label="educationally" /><br />
                            <FormControlLabel className={checkboxClass} disabled control={event.handicap.physicalDisabled ? checkedBox : uncheckedBox} label="pyhsically" /><br />
                            <FormControlLabel className={checkboxClass} disabled control={event.interactive ? checkedBox : uncheckedBox} label="interaktiv" /><br />
                            <FormControlLabel className={checkboxClass} disabled control={event.together ? checkedBox : uncheckedBox} label="together" /><br />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Institution</Typography>
                            <Typography className={descClass}>{event.institution}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Detail;