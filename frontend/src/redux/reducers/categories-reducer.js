import { Map, List, fromJS } from 'immutable';
import loadCategories from "../../services/api/shop";

const SET_CATEGORIES = 'SET_CATEGORIES';

const SET_FIRST_CATEGORY = 'SET_FIRST_CATEGORY';

let initialState = Map({
    firstCategory: null,
    data: List()
});

const setFirstCategory = firstCategory => ({
    type: SET_FIRST_CATEGORY,
    payload: { firstCategory }
})

const setCategories = data => ({
    type: SET_CATEGORIES,
    payload: { data }
});

export const getCategories = () => async dispatch => {
    const data = await loadCategories()
    const firstCategory = data[0]
    dispatch(setCategories(data))
    dispatch(setFirstCategory(firstCategory))
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return state.merge(fromJS({ ...action.payload }))
        case SET_FIRST_CATEGORY:
            return state.merge(fromJS({ ...action.payload }))
        default:
            return state
    }
};

export default categoriesReducer;