import { Map, List, fromJS } from 'immutable';
import { loadProducts } from '../../services/api/shop';

const SET_PRODUCTS = 'SET_PRODUCTS';

let initialState = Map({
    initialized: false,
    count: 0,
    next: null,
    previous: null,
    results: List()
})

const setProducts = (
    count,
    next, 
    previous, 
    results
    ) => ({
        type: SET_PRODUCTS,
        payload: { count, next, previous, results }
})

export const fetchProducts = (category, page) => async dispatch => {
    const { count, next, previous, results } = await loadProducts(category, page)
    dispatch(setProducts(count, next, previous, results))
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return state.merge(fromJS({ ...action.payload, initialized: true }))
        default:
            return state
    }
}

export default productsReducer;