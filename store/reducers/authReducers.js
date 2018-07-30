import * as actionTypes from '../actions/auth/actionTypes';

export const initialState = {
  userData: {},
  isLogin: false,
  isAdmin: false,
  isLoading: false,
  error: {
    status: '',
    message: ''
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILED:
      state = {
        ...state,
        isLoading: false,
        error: {
          status: true,
          message: action.error
        }
      };
      return state;

    case actionTypes.LOGIN_SUCCESS:
      state = {
        ...state,
        userData: action.payload,
        isLoading: false,
        isLogin: true,
        isAdmin: action.payload.role === 'admin'
      };
      return state;

    case actionTypes.LOGIN_LOAD:
      state = {
        ...state,
        isLoading: true
      };
      return state;

    // ========== REGISTER USER ==========

    case actionTypes.REGISTER_FAILED:
      state = {
        ...state,
        isLoading: false,
        error: {
          status: true,
          message: action.error
        }
      };
      return state;

    case actionTypes.REGISTER_SUCCESS:
      state = {
        ...state,
        userData: action.payload,
        isLoading: false,
        isLogin: true
      };
      return state;

    case actionTypes.REGISTER_LOAD:
      state = {
        ...state,
        isLoading: true
      };
      return state;

    // ========== LOGOUT USER ==========

    case actionTypes.LOGOUT_LOAD:
      state = {
        ...state,
        isLoading: true
      };
      return state;

    case actionTypes.LOGOUT_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLogin: false,
        isAdmin: false,
        userData: {}
      };
      return state;
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
        isLoading: false,
        isLogin: true,
        isAdmin: action.userData.role === 'admin'
      };
    default:
      return state;
  }
};

export default authReducer;
