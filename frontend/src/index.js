import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getActiveConfig } from './services/dataLoaders';

let state = {
    data: {},
    loadData() {
        getActiveConfig().then(res => this.data.config = res)
    }
};

state.loadData();

const render = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App data={state}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

render(state);

serviceWorker.unregister();
