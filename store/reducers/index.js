import { combineReducers } from 'redux'
import authReducers from './authReducers'
import uiReducers from './uiReducers'
import voteReducers from './voteReducers'

const rootReducer = combineReducers({
  auth: authReducers,
  ui: uiReducers,
  vote: voteReducers
})

export default rootReducer