import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Content  from "./components/Content/Content";
import { Shop } from "./components/Shop/Shop";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";
import { getUiConfig } from "./redux/reducers/config-reducer";
import Preloader from "./components/Preloader/Preloader";

const App = ({ initialized, getUiConfig }) => {
    if (!initialized) {
        getUiConfig();
        return <Preloader/>
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

const mapStateToProps = state => {
    return ({
        initialized: state.get('config').get('initialized'),
    })
}

export default connect(mapStateToProps, { getUiConfig })(App);
