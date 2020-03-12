import { compose, createStore, applyMiddleware } from "redux";
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from "redux-thunk";
import uiConfigReducer from "./reducers/config-reducer";
import categoriesReducer from "./reducers/categories-reducer";

let rootReducer = combineReducers({
    config: uiConfigReducer,
    categories: categoriesReducer
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));