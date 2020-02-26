import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Content} from "./components/Content/Content";
import {Shop} from "./components/Shop/Shop";
import {ContactInfo} from "./components/ContactInfo/ContactInfo";

const App = () => {
    return (
        <React.Fragment>
            <Header/>
            <Switch>
                <Route exact path='/' component={Content}/>
                <Route path='/shop' component={Shop}/>
                <Route path='/contacts' component={ContactInfo}/>
            </Switch>
            <Footer/>
        </React.Fragment>
    )
};

export default App;
