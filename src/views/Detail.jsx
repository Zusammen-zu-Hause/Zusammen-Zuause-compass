import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';


const containerClass = "detailview container";
const itemClass = "detailview item";
const titleClass = "detailview item title";
const closeClass = "detailview close";
const mainnameClass = "detailview mainname";
const timeClass = "detailview time";
const nameClass = "detailview name";
const descClass = "detailview description";

class Detail extends React.Component {

    render() {
        return (
            <>
                <Fab size="small" color="secondary" aria-label="add" className={closeClass}>
                    <Typography>X</Typography>
                </Fab>
                <Grid container className={containerClass} spacing={0}>
                    <Grid item xs={12}>
                        <Paper className={titleClass}>
                            <Typography className={mainnameClass}>{"Ggashlkw\nsGdhjsE\n" + this.props.category + "-" + this.props.id}</Typography>
                            <Typography className={timeClass}>Montag, 13.März 2020{"\n"}20:50</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Qui sunt incididunt non ullamco aute id aliqua cillum minim veniam.</Typography>
                            <Typography className={descClass}>Anim adipisicing quis Lorem ex proident exercitation voluptate et id enim fugiat. Adipisicing magna proident culpa veniam duis aute adipisicing et exercitation. Qui ea enim proident laboris esse ex deserunt et labore proident eu. Adipisicing nostrud exercitation minim voluptate eiusmod. Pariatur exercitation enim reprehenderit ut sunt et nostrud non ut ipsum labore irure consequat irure. Id eu exercitation reprehenderit sint fugiat ea.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Aliquip anim cillum esse laborum esse nisi nostrud ex labore do voluptate laboris.</Typography>
                            <Typography className={descClass}>Duis officia minim quis et dolore. Laboris excepteur sint velit aliquip voluptate pariatur magna ullamco amet anim ipsum pariatur occaecat. Irure tempor culpa in fugiat est veniam irure id exercitation. Eu anim veniam tempor eu adipisicing ea consequat laborum voluptate sint id mollit. Dolore et ad in id pariatur incididunt ad Lorem. Ipsum non amet occaecat dolore fugiat sit nisi commodo dolore velit eiusmod cupidatat Lorem tempor.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Proident culpa esse qui labore non voluptate veniam cupidatat qui labore adipisicing consectetur dolor et.</Typography>
                            <Typography className={descClass}>Cillum mollit cupidatat ea amet incididunt aliqua enim deserunt et adipisicing sint occaecat. Ex aliquip dolore qui cillum sit ad aliqua nisi enim. Cupidatat minim adipisicing aute nulla ea dolor ad cupidatat id incididunt.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Incididunt ad in amet cillum fugiat commodo enim deserunt aliquip consequat excepteur pariatur sunt.</Typography>
                            <Typography className={descClass}>Et incididunt nostrud sunt nulla ad eiusmod ullamco anim culpa laboris non consequat. Aliqua exercitation id in ipsum sint do Lorem adipisicing et officia cupidatat nostrud ex. Voluptate dolore eu dolore amet sit.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={itemClass}>
                            <Typography className={nameClass}>Tempor nisi deserunt eu enim dolor irure et enim.</Typography>
                            <Typography className={descClass}>Dolor exercitation cupidatat elit elit velit esse excepteur culpa sunt magna aute. Aliqua ut eu veniam culpa consectetur sunt consequat duis culpa. Officia do qui Lorem irure fugiat ex eu pariatur est magna ea non amet veniam. Sunt consectetur ullamco esse ut enim sint id proident eiusmod cillum cillum aliqua cillum id.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Detail;