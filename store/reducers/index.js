import { combineReducers } from 'redux';
import authReducers, { initialState as authInitialState } from './authReducers';
import uiReducers, { initialState as uiInitialState } from './uiReducers';
import voteReducers, { initialState as voteInitialState } from './voteReducers';

const rootReducer = combineReducers({
  auth: authReducers,
  ui: uiReducers,
  vote: voteReducers
});

export const rootInitialState = {
  auth: authInitialState,
  ui: uiInitialState,
  vote: voteInitialState
};

export default rootReducer;
