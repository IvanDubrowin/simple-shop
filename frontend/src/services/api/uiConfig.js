import { API } from "./base"
import { ACTIVE_CONFIG_ENDPOINT } from "../../constants/api"

export const loadUiConfig = async (data) => {
    const res = await API.get(ACTIVE_CONFIG_ENDPOINT)
    return res.data
}