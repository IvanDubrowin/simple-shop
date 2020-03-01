import React from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Content } from "./components/Content/Content";
import { Shop } from "./components/Shop/Shop";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";
import { getUiConfig } from './redux/reducers/config-reducer';

const App = ({ initialized, getUiConfig }) => {
    if (!initialized) {
        getUiConfig();
    }

    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path='/' component={Content} />
                <Route path='/shop' component={Shop} />
                <Route path='/contacts' component={ContactInfo} />
            </Switch>
            <Footer />
        </React.Fragment>
    )
};

let mapStateToProps = state => {
    return ({
        initialized: state.config.initialized,
        title: state.config.title
    })
}

export default connect(mapStateToProps, { getUiConfig })(App);
