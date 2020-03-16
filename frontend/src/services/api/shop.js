import { API } from "./base"
import { CATEGORIES_ENDPOINT, RELATED_PRODUCTS, PAGE } from "../../constants/api"

export const loadCategories = async () => {
    const res = await API.get(CATEGORIES_ENDPOINT)
    return res.data
}

export const loadProducts  = async (categoryId, page) => {
    const url = `${CATEGORIES_ENDPOINT}${categoryId}${RELATED_PRODUCTS}${PAGE}${page}`
    const res = await API.get(url)
    return res.data
}
