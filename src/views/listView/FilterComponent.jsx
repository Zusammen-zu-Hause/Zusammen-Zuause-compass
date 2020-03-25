import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
    Switch
} from "@material-ui/core"

import "./css/filterComponent.css"

interface FilterComponentProps {
    visible: boolean,
    dismissCallback: () => void
}

interface FilterComponentState {
    gebaerdeChecked: boolean,
    audioChecked: boolean,
    ageValue: number,
    priceValue: number,
    // selectedDate: date
}

export default class FilterComponent extends React.Component<FilterComponentProps, FilterComponentState>{

    constructor(props: FilterComponentProps) {
        super(props);
        this.state = {
            gebaerdeChecked: false, 
            audioChecked: false, 
            ageValue: [16,95], 
            priceValue: 0
            // , selectedDate: new Date('2014-08-18T21:11:54')
        };
        this.handleAudioChange = this.handleAudioChange.bind(this);
        this.handleGebaerdeChange = this.handleGebaerdeChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.getTextValueAge = this.getTextValueAge.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.getTextValuePrice = this.getTextValuePrice.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss(){
        this.props.dismissCallback();
    }

    handleGebaerdeChange() {
        this.setState({gebaerdeChecked: !this.state.gebaerdeChecked})
    }

    handleAudioChange() {
        this.setState({audioChecked: !this.state.audioChecked})
    }

    handleAgeChange = (event, newValue) => {
        this.setState({ageValue: newValue});
    };

    getTextValueAge(): string {
        return this.state.ageValue
    }

    handlePriceChange = (event, newValue) => {
        this.setState({priceValue: newValue});
    };

    getTextValuePrice(): string {
        return this.state.priceValue
    }

    handleDateChange = (newValue) => {
        this.setState({selectedDate: newValue});
    };

    render() {
        return(
            <Dialog style={{display: this.props.visible ? "" : "none"}}
                    onClose={this.handleDismiss} aria-labelledby="customized-dialog-title" open>
                <DialogTitle id="customized-dialog-title" onClose={this.handleDismiss}>
                    Filter
                </DialogTitle>
                <DialogContent dividers>
                    <div className={"filtersection"}>
                        <p className={"filterline"}>Alter</p>
                        <Slider
                            className={"filterline"}
                            value={this.state.ageValue}
                            onChange={this.handleAgeChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={this.getTextValueAge}
                        />
                    </div>
                    {/*<div className={"filtersection"}>*/}
                    {/*    <p className={"filterline"}>Datum</p>*/}
                    {/*    <p>not working yet ....... /§$(%)"§/$&!&§$/%(!§$%</p>*/}
                        {/*<MuiPickersUtilsProvider utils={"moment"}>*/}
                        {/*    <KeyboardDatePicker*/}
                        {/*        disableToolbar*/}
                        {/*        variant="inline"*/}
                        {/*        format="MM/dd/yyyy"*/}
                        {/*        margin="normal"*/}
                        {/*        id="date-picker-inline"*/}
                        {/*        label="Date picker inline"*/}
                        {/*        value={this.state.selectedDate}*/}
                        {/*        onChange={this.handleDateChange}*/}
                        {/*        KeyboardButtonProps={{*/}
                        {/*            'aria-label': 'change date',*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</MuiPickersUtilsProvider>*/}

                    {/*</div>*/}
                    {/*<div className={"filtersection"}>*/}
                    {/*    <p className={"filterline"}>Uhrzeit</p>*/}
                    {/*    <p>not working yet .......</p>*/}
                    {/*</div>*/}
                    <div className={"filtersection"}>
                        <p className={"filterline"} >Audio</p>
                        <Switch
                            className={"filterline filterelement"}
                            checked={this.state.audioChecked}
                            onChange={this.handleAudioChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    <div className={"filtersection"}>
                        <p className={"filterline"}>Gebärde</p>
                        <Switch
                            className={"filterline filterelement"}
                            checked={this.state.gebaerdeChecked}
                            onChange={this.handleGebaerdeChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    <div className={"filtersection"}>
                        <p className={"filterline"}>Preis bis</p>
                        <Slider
                            className={"filterline"}
                            value={this.state.priceValue}
                            onChange={this.handlePriceChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={this.getTextValuePrice}
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleDismiss} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}