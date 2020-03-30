import { Map, fromJS } from 'immutable';
import { addToCart, deleteProductInCart, loadCart } from '../../services/api/shop';

const LOAD_CART = 'LOAD_CART'

const ADD_TO_CART = 'ADD_TO_CART'

const DELETE_PRODUCT_IN_CART = 'DELETE_PRODUCT_IN_CART'

let initialState = Map({
    priceCount: 0,
    items: Map()
})

const setCartDataAction = (priceCount, items) => ({
    type: LOAD_CART,
    payload: { priceCount, items }
})

const addToCartAction = item => ({
    type: ADD_TO_CART,
    payload: item
})

const getPriceCount = cartData => {
    console.log(cartData)
    return cartData.reduce(
        (total, item, _) => total + (item.count * item.price),
        initialState.get('priceCount')
    )
}

const listToMap = cartData => {
    return cartData.reduce(
        (map, item) => {
            map[item.product] = {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                count: item.count
            }
            return map
        }, Map()
    )
}

export const getCartData = () => async dispatch => {
    const cartData = await loadCart()
    const items = listToMap(cartData)
    const priceCount = getPriceCount(items)
    dispatch(setCartDataAction(priceCount, items))
}

export const addCartItem = (productId, count) => async dispatch => {
    const item = await addToCart(productId, count)
    dispatch(addToCartAction(item))
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return state.merge(fromJS({ ...action.payload }))
        case ADD_TO_CART:
            const item = action.payload

            state = state.setIn(
                ['items' , item.product], {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    count: item.count
                }
            )
            const priceCount = getPriceCount(state.get('items'))

            return state.setIn(['priceCount'], priceCount)
        default:
            return state
    }
}

export default cartReducer;


