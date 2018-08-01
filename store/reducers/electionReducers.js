import * as actionTypes from '../actions/election/actionTypes';

export const initialState = {
  election: null,
  community: null,
  candidates: [],
  voters: [],
  communityUsers: []
};

const electionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ELECTION:
      return {
        ...state,
        election: action.election
      };

    case actionTypes.SET_COMMUNITY:
      return {
        ...state,
        community: action.community
      };

    case actionTypes.SET_CANDIDATES:
      return {
        ...state,
        candidates: action.candidates
      };
    case actionTypes.SET_VOTERS:
      return {
        ...state,
        voters: action.voters
      };
    case actionTypes.SET_COMMUNITY_USERS:
      return {
        ...state,
        communityUsers: action.communityUsers
      };
    default:
      return state;
  }
};

export default electionReducer;
