import API from "./API";
import { ACTIVE_CONFIG_ENDPOINT } from "../constants/api";

export const getActiveConfig = (data) => {
    return API.get(ACTIVE_CONFIG_ENDPOINT).then(res => res.data)
}



