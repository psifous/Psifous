import * as actionTypes from '../actions/ui/actionTypes';

let initialState = {
  visible: false,
  isLoading: false,
  selectedCandidate: null
};

const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIDEBAR_HANDLE :
      state = {
        ...state,
        visible: !state.visible
      };
      return state;

    case actionTypes.SIDEBAR_CLOSE :
      state = {
        ...state,
        visible: false
      };
      return state;

    case actionTypes.CANDIDATE_LOAD_CHECKED :
      state = {
        ...state,
        isLoading: true
      };
      return state;

    case actionTypes.CANDIDATE_CHECKED :
      state = {
        ...state,
        selectedCandidate: action.payload.index
      };
      return state;

    default :
      return state;
  }
};

export default uiReducers