import * as actionTypes from '../actions/ui/actionTypes';

export const initialState = {
  visible: false,
  isLoading: false,
  showConfirmation: false,
  showModal: false,
  errorMessages: []
};

const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIDEBAR_HANDLE:
      state = {
        ...state,
        visible: !state.visible
      };
      return state;

    case actionTypes.SIDEBAR_CLOSE:
      state = {
        ...state,
        visible: false
      };
      return state;
    case actionTypes.CONFIRMATION_OPEN:
      return {
        ...state,
        showConfirmation: true
      };
    case actionTypes.CONFIRMATION_CLOSE:
      return {
        ...state,
        showConfirmation: false
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        showModal: false
      };
      STOP_LOADING;
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default uiReducers;
