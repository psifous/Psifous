import * as actionTypes from '../actions/community/actionTypes';

export const initialState = {
  community: null,
  communities: []
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMUNITY:
      return {
        ...state,
        community: action.community
      };

    case actionTypes.FETCH_COMMUNITIES:
      return {
        ...state,
        community: action.communities
      };

    default:
      return state;
  }
};

export default communityReducer;
