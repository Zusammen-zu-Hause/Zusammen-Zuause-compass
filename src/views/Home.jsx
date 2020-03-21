import React from 'react';
import  {
    AppBar,
    Button,
    TextField,
    Toolbar,
    Typography,

} from '@material-ui/core';
import CategoryCard from '../components/CategoryCard';

class Home extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <>
                <AppBar position="static" className="appbar">
                    <Toolbar>
                        <Typography variant="h6" className="title">
                            Zusammen zu Hause
                        </Typography>
                        <Button color="secondary" variant="contained">Erstelle ein ZzH Event</Button>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Registrieren</Button>
                    </Toolbar>
                </AppBar>
                <div className="search">
                    <div className="title">
                        <Typography variant="h4">Zusammen Begegnungen schaffen</Typography>
                        <Typography variant="body1">Eine Treffpunkt für Gleichgesinnte zum kulturellen Austausch oder um einfach nur online ein Bier zu trinken</Typography>
                    </div>
                    <TextField color="secondary" label="Suchen" variant="filled" className="search-box" />
                </div>
                <div className="categories">
                    <Typography variant="h4" className="title">Kategorien</Typography>
                    <CategoryCard 
                        title="Party" 
                        url="/category/party" 
                        image="https://cdn.discordapp.com/attachments/690930904557813811/690958782871896206/audience-1867754_1280.webp"
                        history={history}
                        />
                </div>
            </>
        );
    }
}

export default Home;
