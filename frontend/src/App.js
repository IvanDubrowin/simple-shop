import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import { Shop } from "./components/Shop/Shop";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";
import { getUiConfig } from "./redux/reducers/config-reducer";
import Preloader from "./components/Preloader/Preloader";

const theme = createMuiTheme({});

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        flex: '1 0 auto',
        justifyContent: 'center'
    }
}));


const App = ({ initialized, getUiConfig }) => {
    const classes = useStyles();

    if (!initialized) {
        getUiConfig();
        return <ThemeProvider theme={theme}><Preloader /></ThemeProvider>
    }
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Header />
                <div className={classes.contentWrapper}>
                    <Switch>
                        <Route exact path='/' component={Content} />
                        <Route path='/shop' component={Shop} />
                        <Route path='/contacts' component={ContactInfo} />
                    </Switch>
                </div>
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return ({
        initialized: state.get('config').get('initialized'),
    })
}

export default connect(mapStateToProps, { getUiConfig })(App);
