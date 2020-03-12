import { API } from "./base"
import { CATEGORIES_ENDPOINT } from "../../constants/api"

const loadCategories = async (data) => {
    const res = await API.get(CATEGORIES_ENDPOINT)
    return res.data
}

export default loadCategories;