import weatherReducer from './weatherReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    weatherReducer
})

export default rootReducer