import * as actionTypes from '../actions/ui/actionTypes';

let initialState = {
  visible: false
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

    default :
      return state;
  }
};

export default uiReducers