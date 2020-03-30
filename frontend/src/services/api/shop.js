import { API } from "./base"
import { CATEGORIES_ENDPOINT, RELATED_PRODUCTS, PAGE, CART_ENDPOINT } from "../../constants/api"

export const loadCategories = async () => {
    const res = await API.get(CATEGORIES_ENDPOINT)
    return res.data
}

export const loadProducts = async (categoryId, page) => {
    const url = `${CATEGORIES_ENDPOINT}${categoryId}${RELATED_PRODUCTS}${PAGE}${page}`
    const res = await API.get(url)
    return res.data
}

export const loadCart = async () => {
    const res = await API.get(CART_ENDPOINT)
    return res.data
}

export const addToCart = async (productId, count) => {
    const res = await API.post(CART_ENDPOINT, { product: productId, count })
    return res.data
}

export const deleteProductInCart = async id => await API.delete(`${CART_ENDPOINT}${id}`)