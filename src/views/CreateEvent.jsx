import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Stepper, Step, StepLabel } from '@material-ui/core/';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Event, Institution, Category } from '../model/model';
import '../styles/Create.css';
import FirebaseConnector from '../model/FirebaseConnector';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const rootClass = "createevent root";
const timePickersClass = "createevent timepickers";
const attributesControllClass = "createevent attributesControll";
const moneyRootClass = "createevent moneyroot";
const moneyValueClass = "createevent moneyvalue";
const moneyMandClass = "createevent moneymand";
const sliderClass = "createevent slider";
const buttonClass = "createevent button";
const categoryClass = "createevent category";
const institutionClass = "createevent institution";
const loadingClass = "createevent loading";

const MAXPRICE = 1000;



const steps = ['Allgemein', 'Zeit', 'Besonderes', 'Institution', 'Sonstiges', 'Fertig'];

const toISO = (date, time) => {
    let day = date.split("-")[2];
    let month = date.split("-")[1];
    let year = date.split("-")[0];
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];

    let d = new Date(year, month - 1, day, hour, minute);
    return d.toISOString();
}

class CreateEvent extends React.Component {


    constructor(...args) {
        super(...args);
        this.state = {
            loadedCat: false,
            loadedInst: false,
            activeStep: 0,
            title: "",
            shortDesc: "",
            description: "",
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toISOString().slice(11, 16),
            blind: false, childFriendly: false, deaf: false, interactive: false, physicalDisabled: false, together: false,
            institutionList: [],
            categoryList: [],
            age: [0, 100],
            money: 0,
            moneyMandatory: false,
            memberCount: [0, 100],
            category: "",
            institution: "",
            image: "",
            eventLink: "",
            isPublic: false,
            sending: false,
        }


        this.handleStep0 = this.handleStep0.bind(this);
        this.handleStep1 = this.handleStep1.bind(this);
        this.handleStep2 = this.handleStep2.bind(this);
        this.handleStep3 = this.handleStep3.bind(this);
        this.handleStep4 = this.handleStep4.bind(this);
        this.handleStep5 = this.handleStep5.bind(this);


        this.handleStep0back = this.handleStep0back.bind(this);
        this.handleStep1back = this.handleStep1back.bind(this);
        this.handleStep2back = this.handleStep2back.bind(this);
        this.handleStep3back = this.handleStep3back.bind(this);
        this.handleStep4back = this.handleStep4back.bind(this);
        this.handleStep5back = this.handleStep5back.bind(this);
    }

    componentDidMount() {
        this.loadInstitutions();
        this.loadCategorys();
    }

    async loadInstitutions() {
        let db = new FirebaseConnector();
        let ids = await db.getInstitutionIds();
        let list: Institution[] = [];
        for (let id of ids) {
            let inst = await db.getInstitution(id);
            if (inst != null) {
                list.push(inst);
            }
        }
        await this.setState({
            loadedInst: true,
            institutionList: list,
        });
    }

    async loadCategorys() {
        let db = new FirebaseConnector();
        let ids = await db.getCategoryIds();
        let list: Category[] = [];
        for (const id of ids) {
            const cat = await db.getCategory(id);
            if (cat != null) {
                list.push(cat);
            }
        }
        await this.setState({
            loadedCat: true,
            categoryList: list,
        });
    }

    valUpdate = name => event => {
        this.setState({ [name]: event.target.value });
    };

    moneyUpdate = name => event => {
        if (!isNaN(event.target.value) && +event.target.value >= 0 && +event.target.value < MAXPRICE) {
            this.setState({ [name]: event.target.value });
        }
    }

    checkboxUpdate = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    rangeChange = (event, value) => {
        this.setState({ [event.target.id]: value });
    };

    render() {
        const { loadedCat, loadedInst, activeStep, title, shortDesc, description, date, time, blind, childFriendly, deaf, interactive, physicalDisabled, together, institutionList, categoryList, age, money, moneyMandatory, memberCount, category, institution, image, eventLink, isPublic, sending } = this.state;
        if (!loadedCat || !loadedInst) {
            return (<CircularProgress className={loadingClass} />);
        }
        return (
            <>

                <Toolbar>
                    <Typography variant="h6" className="title">
                        Zusammen zu Hause
                    </Typography>
                </Toolbar>
                <div className={rootClass}>
                    <Stepper className="stepper" activeStep={activeStep}>
                        {steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {activeStep === 0 && (
                        <>
                            <form onSubmit={this.handleStep0}>
                                <TextField label="Titel" variant="outlined" className="text-field" value={title} onChange={this.valUpdate("title")} fullWidth required />
                                <TextField label="Kurzbeschreibung" variant="outlined" className="text-field" value={shortDesc} onChange={this.valUpdate("shortDesc")} fullWidth required />
                                <TextField label="Beschreibung" variant="outlined" className="text-field" value={description} onChange={this.valUpdate("description")} fullWidth multiline rows="8" required />
                                <FormControl variant="outlined" className={categoryClass}>
                                    <InputLabel id="catlabel">Kategorie</InputLabel>
                                    <Select
                                        fullWidth
                                        className={categoryClass}
                                        labelId="catlabel"
                                        id="catsel"
                                        value={category}
                                        onChange={this.valUpdate("category")}
                                        label="Kategorie"
                                        required
                                    >
                                        {
                                            categoryList.map((category, index) => <MenuItem key={index} value={category.id}>{category.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <Button color="secondary" type="submit" variant="outlined" fullWidth className={"text-field " + buttonClass}>Weiter</Button>
                            </form>
                        </>)
                    }

                    {activeStep === 1 && (
                        <>
                            <form onSubmit={this.handleStep1}>
                                <TextField
                                    id="date"
                                    label="Datum"
                                    type="date"
                                    value={date}
                                    onChange={this.valUpdate("date")}
                                    className={timePickersClass}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="time"
                                    label="Zeit"
                                    type="time"
                                    value={time}
                                    onChange={this.valUpdate("time")}
                                    className={timePickersClass}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button color="secondary" type="submit" variant="outlined" fullWidth className={"text-field " + buttonClass}>Weiter</Button>
                                <Button color="secondary" variant="outlined" onClick={this.handleStep1back} fullWidth className={"text-field " + buttonClass}>Zurück</Button>
                            </form>
                        </>)
                    }

                    {activeStep === 2 && (
                        <>
                            <form onSubmit={this.handleStep2}>
                                {/*blind, childFriendly, deaf, interactive, physicalDisabled, together*/}
                                <FormControl component="fieldset" className={attributesControllClass}>
                                    <FormLabel component="legend">Besonderheiten</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={blind} name="blind" onChange={this.checkboxUpdate} />}
                                            label="blind"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={childFriendly} name="childFriendly" onChange={this.checkboxUpdate} />}
                                            label="kinderfreundlich"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={deaf} name="deaf" onChange={this.checkboxUpdate} />}
                                            label="taub"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={interactive} name="interactive" onChange={this.checkboxUpdate} />}
                                            label="interaktiv"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={physicalDisabled} name="physicalDisabled" onChange={this.checkboxUpdate} />}
                                            label="körperlich behindert"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={together} name="together" onChange={this.checkboxUpdate} />}
                                            label="zusammen"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Diese Einstellungen helfen die Events zu filtern.</FormHelperText>
                                </FormControl>
                                <Button color="secondary" type="submit" variant="outlined" fullWidth className={"text-field " + buttonClass}>Weiter</Button>
                                <Button color="secondary" variant="outlined" onClick={this.handleStep2back} fullWidth className={"text-field" + buttonClass}>Zurück</Button>
                            </form>
                        </>)
                    }

                    {activeStep === 3 && (
                        <>
                            <form onSubmit={this.handleStep3}>
                                <FormControl variant="outlined" className={institutionClass}>
                                    <InputLabel id="instlabel">Institution</InputLabel>
                                    <Select
                                        fullWidth
                                        className={categoryClass}
                                        labelId="instlabel"
                                        id="instsel"
                                        value={institution}
                                        onChange={this.valUpdate("institution")}
                                        label="Institution"
                                        required
                                    >
                                        {
                                            institutionList.map((institution, index) => <MenuItem key={index} value={institution.id}>{institution.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <Button color="secondary" type="submit" variant="outlined" fullWidth className={"text-field " + buttonClass}>Weiter</Button>
                                <Button color="secondary" variant="outlined" onClick={this.handleStep3back} fullWidth className={buttonClass}>Zurück</Button>
                            </form>
                        </>)
                    }

                    {activeStep === 4 && (
                        <>
                            <form onSubmit={this.handleStep4}>
                                {/*FIXME: not fluid/steps are too big*/}
                                <Typography>Alter</Typography>
                                <Slider
                                    className={sliderClass}
                                    value={age}
                                    id="age"
                                    getAriaValueText={(val) => val}
                                    aria-labelledby="discrete-slider-custom"
                                    onChange={this.rangeChange}
                                    valueLabelDisplay="on"
                                    step={1}
                                />
                                <Typography>Anzahl Mitglieder</Typography>
                                <Slider
                                    className={sliderClass}
                                    value={memberCount}
                                    id="memberCount"
                                    getAriaValueText={(val) => val}
                                    aria-labelledby="discrete-slider-custom"
                                    onChange={this.rangeChange}
                                    valueLabelDisplay="on"
                                    step={1}
                                />
                                <TextField label="Joinlink (optional)" variant="outlined" className="text-field" value={eventLink} onChange={this.valUpdate("eventLink")} fullWidth />
                                <FormControlLabel
                                    control={<Checkbox checked={isPublic} name="isPublic" onChange={this.checkboxUpdate} />}
                                    label="Link veröffentlichen:   Wenn der Link veröffentlicht wird kann jeder unabhängig von der Teilnehmer anzahl beitreten."
                                />
                                <div className={moneyRootClass}>
                                    <FormControl className={moneyValueClass} variant="outlined">
                                        <InputLabel htmlFor="money">Preis</InputLabel>
                                        <OutlinedInput
                                            id="money"
                                            value={money}
                                            onChange={this.moneyUpdate('money')}
                                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                    <FormControlLabel
                                        className={moneyMandClass}
                                        control={<Checkbox checked={moneyMandatory} name="moneyMandatory" onChange={this.checkboxUpdate} />}
                                        label="Bezahlung optional"
                                    />
                                </div>

                                <Button color="secondary" type="submit" variant="outlined" fullWidth className={"text-field " + buttonClass}>Weiter</Button>
                                <Button color="secondary" variant="outlined" onClick={this.handleStep4back} fullWidth className={"text-field " + buttonClass}>Zurück</Button>
                            </form>
                        </>)
                    }

                    {activeStep === 5 && (
                        <>
                            <form onSubmit={this.handleStep5}>
                                <TextField label="Link zu Icon (optional)" variant="outlined" className="text-field" value={image} onChange={this.valUpdate("image")} fullWidth />
                                {sending ? (<Button color = "secondary" type = "submit" variant = "outlined" fullWidth disabled className = {"text-field " + buttonClass}>Erstellen</Button>): (
                                    <Button color = "secondary" type = "submit" variant = "outlined" fullWidth className = {"text-field " + buttonClass}>Erstellen</Button>
                                )}
                            </form>
                        </>)
                    }

            </div>
            </>
        );
    }

    handleStep0(e) {
        if (this.state.category.length > 0) {
            this.setState({
                activeStep: 1
            });
        }
        e.preventDefault();
    }

    handleStep1() {
        this.setState({
            activeStep: 2
        });
    }

    handleStep2() {
        this.setState({
            activeStep: 3
        });
    }

    handleStep3(e) {
        if (this.state.institution.length > 0) {
            this.setState({
                activeStep: 4
            });
        }
        e.preventDefault();
    }

    handleStep4() {
        this.setState({
            activeStep: 5
        });
    }

    async handleStep5(ev) {
        ev.preventDefault();
        if(this.state.sending) {
            return;
        }
        await this.setState({
            sending: true
        });
        let creationDate = new Date().toISOString();
        const e = new Event(
            "", // id
            {
                blind: this.state.blind,
                childFriendly: this.state.childFriendly,
                deaf: this.state.deaf,
                interactive: this.state.interactive,
                physicalDisabled: this.state.physicalDisabled,
                together: this.state.together
            }, //
            {
                min: this.state.age[0],
                max: this.state.age[1]
            }, // age
            creationDate, // creationDate
            this.state.description, // description
            {
                mandatory: this.state.moneyMandatory,
                price: this.state.money
            }, // financial
            this.state.institution, // institutionId
            this.state.image, // logoSrc
            {
                min: this.state.memberCount[0],
                max: this.state.memberCount[1]
            }, // memberCount
            toISO(this.state.date, this.state.time), // startDate
            this.state.shortDesc, // shortDescription
            this.state.isPublic, // isPublic
            this.state.eventLink, // eventLink
            this.state.title // title
        );
        const r = await new FirebaseConnector().createEvent(this.state.category, e);
        if (!r) {
            console.error("FEHLER, aber es sieht keiner :)");
            this.props.history.push("/");
            return;
        }
        // TODO: display sucess / failure!
        let loadedids = await new FirebaseConnector().getEventIds(this.state.category);
        for(let id of loadedids) {
            let event = await new FirebaseConnector().getEvent(this.state.category, id);
            if(event.title === this.state.title && event.creationDate === creationDate) {
                this.props.history.push("/category/" + this.state.category + "/event/" + id);
                return;
            }
        }
    }

    handleStep0back() {
        this.setState({
            activeStep: 0
        });
    }

    handleStep1back() {
        this.setState({
            activeStep: 0
        });
    }

    handleStep2back() {
        this.setState({
            activeStep: 1
        });
    }

    handleStep3back() {
        this.setState({
            activeStep: 2
        });
    }

    handleStep4back() {
        this.setState({
            activeStep: 3
        });
    }

    handleStep5back() {
        this.setState({
            activeStep: 4
        });
    }
}

export default CreateEvent;