import { Map, fromJS } from "immutable"
import { loadUiConfig } from "../../services/api/uiConfig"

const SET_CONFIG = 'SET_CONFIG'

let initialState = Map({
    initialized: false,
    title: null,
    carousel: null,
    contact_info: null,
    content: null
})

const setUiConfigAction = (title, carousel, contact_info, content) => ({
    type: SET_CONFIG,
    payload: { title, carousel, contact_info, content }
})

export const getUiConfig = () => async dispatch => {
    let configData = await loadUiConfig();
    let { title, carousel, contact_info, content } = configData;
    dispatch(setUiConfigAction(title, carousel, contact_info, content));
}

const uiConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIG:
            return state.merge(fromJS({ ...action.payload, initialized: true}))

        default:
            return state
    }
}

export default uiConfigReducer