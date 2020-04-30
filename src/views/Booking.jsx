import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import '../styles/Booking.css';
import FirebaseConnector from "../model/FirebaseConnector";
import * as auth from "../model/firebase_auth";
/* HOW TO CLOSE: (example from https://stackoverflow.com/questions/52622578/react-component-self-close-on-button-click#answer-52622628)
const MyReactComponent = (props) => <div>

    <h1>TEST</h1>

    <button onClick={props.onClose}>Self Close</button>

</div>;

class ParentComponent extends React.Component {
  // Note: This uses the class fields proposal, currently at Stage 3 and
  // commonly transpiled in React projects
  closeChild = () => {
    this.setState({
      showChild: false
    });
  };
  constructor(...args) {
    super(...args);
    this.state = {
      showChild: true
    };
  }
  render() {
    return (
      <div>
        {this.state.showChild && <MyReactComponent onClose={this.closeChild} />}
      </div>
    );
  }
}
*/

const containerClass = "bookingview container";
const itemClass = "bookingview item";
const titleClass = "bookingview item title";
const closeClass = "bookingview close";
const closeIconClass = "bookingview closeicon";
const closeIconSpaceClass = "bookingview closeiconspace";
const mainnameClass = "bookingview mainname";
const buttonClass = "bookingview button";
const inputClass = "bookingview input";

const emailRegex = new RegExp("(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))");


class Booking extends React.Component {


    constructor(...args) {
        super(...args);
        this.email = "";
        this.name = "";
        this.user = auth.getCurrentUser();
        if (this.user != null) {
            this.email = this.user.email;
            this.name = this.user.displayName;
        }
        this.state = {
            clicked: false
        };
        this.bookBtn = this.bookBtn.bind(this);
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Grid container className={containerClass} spacing={0}>
                    <Fab size="small" color="secondary" aria-label="add" className={closeClass} onClick={this.props.onClose}>
                        <div className={closeIconClass}></div>
                    </Fab>
                    <Grid item xs={12}>
                        <Paper className={titleClass}>
                            <div className={closeIconSpaceClass}></div>
                            <Typography className={mainnameClass}>Buchen</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <TextField id="outlined-basic" label="Email" className={inputClass} variant="outlined" defaultValue={this.email} onChange={this.handleEmailChange} type="email"/>
                            <TextField id="outlined-basic" label="Name" className={inputClass} variant="outlined" defaultValue={this.name} onChange={this.handleNameChange} />
                        </Paper>
                    </Grid>

                    <Button variant="contained" className={buttonClass} color="primary" onClick={this.bookBtn}>Absenden</Button>
                </Grid>
            </>
        );
    }

    async bookBtn() {
        if (this.state.clicked)
            return;
        await this.setState({
            clicked: true
        })
        if (this.email === undefined || this.name === undefined || this.props.category === undefined || this.props.eventID === undefined) {
            this.props.onError();
            return;
        }
        // TODO: check email!
        if(!emailRegex.test(this.email)) {
            this.props.onError();
            return;
        }
        let m = await new FirebaseConnector().getMemberMails(this.props.category, this.props.eventID);
        let l = m.length;
        if(l >= this.props.max) {
            this.props.onError();
            return;
        }
        let r = new FirebaseConnector().createMember(this.props.category, this.props.eventID, { email: this.email, name: this.name })
        if (!r) {
            this.props.onError();
            return;
        }
        this.props.onSuccess();
    }

    handleEmailChange = (e) => {
        this.email = e.target.value;
    }

    handleNameChange = (e) => {
        this.name = e.target.value;
    }
}

export default Booking;