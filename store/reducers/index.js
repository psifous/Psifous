import { combineReducers } from 'redux';
import authReducers, { initialState as authInitialState } from './authReducers';
import uiReducers, { initialState as uiInitialState } from './uiReducers';
import voteReducers, { initialState as voteInitialState } from './voteReducers';
import electionReducers, {
  initialState as electionInitialState
} from './electionReducers';

const rootReducer = combineReducers({
  auth: authReducers,
  ui: uiReducers,
  vote: voteReducers,
  election: electionReducers
});

export const rootInitialState = {
  auth: authInitialState,
  ui: uiInitialState,
  vote: voteInitialState,
  election: electionInitialState
};

export default rootReducer;
