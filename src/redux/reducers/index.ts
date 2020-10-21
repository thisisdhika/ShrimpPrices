import { combineReducers } from 'redux'

import authReducer from './auth'
import locationReducer from './location'

const rootReducer = combineReducers({
  authReducer,
  locationReducer,
})

export default rootReducer
