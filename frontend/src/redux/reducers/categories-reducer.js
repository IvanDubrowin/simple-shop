import { Map, List, fromJS } from "immutable"
import { loadCategories } from "../../services/api/shop"

const SET_CATEGORIES = 'SET_CATEGORIES'

const SET_FIRST_CATEGORY = 'SET_FIRST_CATEGORY'

let initialState = Map({
    firstCategory: null,
    items: List()
})

const setFirstCategoryAction = firstCategory => ({
    type: SET_FIRST_CATEGORY,
    payload: { firstCategory }
})

const setCategoriesAction = items => ({
    type: SET_CATEGORIES,
    payload: { items }
})

export const getCategories = () => async dispatch => {
    const items = await loadCategories()
    const firstCategory = items[0]
    dispatch(setCategoriesAction(items))
    dispatch(setFirstCategoryAction(firstCategory))
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
}

export default categoriesReducer