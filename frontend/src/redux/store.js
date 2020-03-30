import { compose, createStore, applyMiddleware } from "redux";
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from "redux-thunk";
import uiConfigReducer from "./reducers/config-reducer";
import categoriesReducer from "./reducers/categories-reducer";
import productsReducer from "./reducers/products-reducer";
import cartReducer from "./reducers/cart-reducer";

let rootReducer = combineReducers({
    config: uiConfigReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));