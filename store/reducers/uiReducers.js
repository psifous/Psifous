import * as actionTypes from '../actions/ui/actionTypes';

let initialState = {
  open: false
};

const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DRAWER_OPEN :
      state = {
        ...state,
        open: true
      };
      return state;

    case actionTypes.DRAWER_CLOSE :
      state = {
        ...state,
        open: false
      };
      return state;

    default :
      return state;
  }
};

export default uiReducers