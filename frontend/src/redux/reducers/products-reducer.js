import { Map, List, fromJS } from "immutable"
import { loadProducts } from "../../services/api/shop"

const SET_PRODUCTS = 'SET_PRODUCTS'

let initialState = Map({
    count: 0,
    page: 1,
    results: List()
})

const setProductsAction = (count, results, page) => ({
    type: SET_PRODUCTS,
    payload: { count, results, page }
})

export const fetchProducts = (categoryId, page) => async dispatch => {
    const { count, results } = await loadProducts(categoryId, page)
    dispatch(setProductsAction(count, results, page))
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return state.merge(fromJS({ ...action.payload }))

        default:
            return state
    }
}

export default productsReducer