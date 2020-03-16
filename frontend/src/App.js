import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Shop from "./components/Shop/Shop";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";
import { getUiConfig } from "./redux/reducers/config-reducer";
import { getCategories } from "./redux/reducers/categories-reducer";
import Preloader from "./components/Preloader/Preloader";

const theme = createMuiTheme({});

const useStyles = makeStyles(theme => ({
    mainWrapper: {
        display: 'flex',
        minHeight: 'calc(100vh - 53px)',
        flex: '1 0 auto',
        justifyContent: 'center',
        marginTop: '80px'
    }
}));


const App = ({ initialized, firstCategory, getUiConfig, getCategories }) => {
    const classes = useStyles();

    if (!initialized) {
        getUiConfig()
        getCategories()
        return <ThemeProvider theme={theme}><Preloader /></ThemeProvider>
    }
    const getShopComponent = (firstCategory) => {
        if (firstCategory) {
            return <Route path='/shop/categories/:id' component={Shop} />
        }
        return null
    }
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Header />
                <div className={classes.mainWrapper}>
                    <Switch>
                        <Route exact path='/' component={Content} />
                        {getShopComponent(firstCategory)}
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
        firstCategory: state.get('categories').get('firstCategory')
    })
}

export default connect(mapStateToProps, { getUiConfig, getCategories })(App);
