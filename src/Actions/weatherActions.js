import axios from 'axios'
import  { FETCH_WEATHER_REPORT_REQUEST, FETCH_WEATHER_REPORT_SUCCESS, FETCH_WEATHER_REPORT_FAILURE } from './actionTypes'


const APPID= '75f972b80e26f14fe6c920aa6a85ad57'
const LOCATION= 'Munich'
const COUNT= 40
const URL= `http://api.openweathermap.org/data/2.5/forecast?q=${LOCATION}&APPID=${APPID}&cnt=${COUNT}`

const fetchWeatherReportRequest = () => {
    return {
        type: FETCH_WEATHER_REPORT_REQUEST
    }
}

const fetchWeatherReportSuccess = (report) => {
    return {
        type: FETCH_WEATHER_REPORT_SUCCESS,
        payload: report
    }
}

const fetchWeatherReportFailure = (error) => {
    return {
        type: FETCH_WEATHER_REPORT_FAILURE,
        payload: error
    }
}


export const fetchReport = () => {
    return (dispatch) => {
        dispatch(fetchWeatherReportRequest)
        axios.get(URL)
            .then(response => {
                const report = (response.data && response.data.list) ? response.data.list : []
                dispatch(fetchWeatherReportSuccess(report))
            })
            .catch(error => {
                const errMessage = error.message
                dispatch(fetchWeatherReportFailure(errMessage))
            })
    }

}

