import { combineReducers } from 'redux'
import authReducers from './authReducers'
import uiReducers from './uiReducers'

const rootReducer = combineReducers({
  auth: authReducers,
  ui: uiReducers
})

export default rootReducer