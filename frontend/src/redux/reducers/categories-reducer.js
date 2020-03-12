import { Map, List, fromJS } from 'immutable';
import loadCategories from "../../services/api/shop";

const SET_CATEGORIES = 'SET_CATEGORIES';

const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

let initialState = Map({
    isLoading: false,
    count: null,
    next: null,
    previous: null,
    results: List()
});

export const setCategories = (count, next, previous, results) => ({
    type: SET_CATEGORIES,
    payload: { count, next, previous, results }
});

export const setLoading = () => ({
    type: LOAD_CATEGORIES
});

export const getCategories = () => async dispatch => {
    dispatch(setLoading());
    let categories = await loadCategories();
    let { count, next, previous, results } = categories;
    dispatch(setCategories(count, next, previous, results));
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return state.merge(fromJS({ ...action.payload, isLoading: false }))
        case LOAD_CATEGORIES:
            return state.merge(fromJS({ isLoading: true }))
        default:
            return state
    }
};

export default categoriesReducer;