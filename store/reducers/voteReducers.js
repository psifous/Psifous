import * as actionTypes from '../actions/vote/actionTypes';

export const initialState = {
  selectedCandidate: null
};

const voteReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CANDIDATE_CHECKED:
      state = {
        ...state,
        selectedCandidate: action.payload.index
      };
      return state;

    default:
      return state;
  }
};

export default voteReducers;
