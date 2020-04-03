import { Map, fromJS } from "immutable"
import { addToCart, deleteProductInCart, loadCart } from "../../services/api/shop"

const LOAD_CART = 'LOAD_CART'

const ADD_TO_CART = 'ADD_TO_CART'

const DELETE_ITEM = 'DELETE_ITEM'

const CLEAR_CART = 'CLEAR_CART'

const CREATE_ORDER = 'CREATE_ORDER'

let initialState = Map({
    totalPrice: 0,
    items: Map(),
    orderCreated: false
})

const setCartDataAction = (totalPrice, items) => ({
    type: LOAD_CART,
    payload: { totalPrice, items }
})

const addToCartAction = item => ({
    type: ADD_TO_CART,
    payload: item
})

const deleteProductAction = productId => ({
    type: DELETE_ITEM,
    payload: productId
})

const clearCartAction = () => ({
    type: CLEAR_CART
})

const createOrderAction = () => ({
    type: CREATE_ORDER
})

const getTotalPrice = cartData => {
    return cartData.reduce(
        (total, item) => parseFloat(total + (item.count * item.price)),
        initialState.get('totalPrice')
    )
}

const addMany = (dispatch, cartData) => cartData.map(item => dispatch(addToCartAction(item)))

export const getCartData = () => async dispatch => {
    const cartData = await loadCart()
    addMany(dispatch, cartData)
}

export const addCartItem = (productId, count) => async dispatch => {
    const item = await addToCart(productId, count)
    dispatch(addToCartAction(item))
}

export const deleteCartItem = productId => async dispatch => {
    await deleteProductInCart(productId)
    dispatch(deleteProductAction(productId))
}

export const clearCart = () => async dispatch => dispatch(clearCartAction())

export const setOrderCreated = () => async dispatch => dispatch(createOrderAction())

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
                    price: parseFloat(item.price),
                    image: item.image,
                    count: item.count
                }
            )
            return state.setIn(['totalPrice'], getTotalPrice(state.get('items')))

        case DELETE_ITEM:
            state = state.deleteIn(['items', action.payload])
            return state.setIn(['totalPrice'], getTotalPrice(state.get('items')))

        case CLEAR_CART:
            return initialState

        case CREATE_ORDER:
            return state.set('orderCreated', true)
            
        default:
            return state
    }
}

export default cartReducer