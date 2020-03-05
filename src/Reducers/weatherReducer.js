import { FETCH_WEATHER_REPORT_REQUEST, FETCH_WEATHER_REPORT_SUCCESS, FETCH_WEATHER_REPORT_FAILURE } from './../Actions/actionTypes'

const initialState = {
    loading: false,
    report: []
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_REPORT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_WEATHER_REPORT_SUCCESS:
            return {
                loading: false,
                report: action.payload,
                error: ''
            }
        case FETCH_WEATHER_REPORT_FAILURE:
            return {
                loading: false,
                report: {},
                error: action.payload
            }
        default:
            return state
    }
}

export default weatherReducer