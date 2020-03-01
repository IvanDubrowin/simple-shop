import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import uiConfigReducer from "./reducers/config-reducer";

let rootReducer = combineReducers({
    config: uiConfigReducer
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));