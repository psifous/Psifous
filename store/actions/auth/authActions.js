import {
  LOGIN_SUCCESS,
  LOGIN_LOAD,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_LOAD,
  REGISTER_FAILED,
  LOGOUT_LOAD,
  LOGOUT_SUCCESS,
  SET_USER_DATA
} from './actionTypes';

import axios from '@/axios';
import { Router } from '@/routes.js';

export const successLogin = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loadLogin = () => {
  return {
    type: LOGIN_LOAD
  };
};

export const failedLogin = err => {
  return {
    type: LOGIN_FAILED,
    error: err
  };
};

export const loadRegister = () => {
  return {
    type: REGISTER_LOAD
  };
};

export const successRegister = userData => {
  return {
    type: REGISTER_SUCCESS,
    payload: userData
  };
};

export const failedRegister = err => {
  return {
    type: REGISTER_FAILED,
    error: err
  };
};

export const loadLogout = () => {
  return {
    type: LOGOUT_LOAD
  };
};

export const successLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const loginAction = user => {
  return async dispatch => {
    try {
      dispatch(loadLogin());
      const { data } = await axios.post('/api/login', user);
      console.log(data);
      const { data: info } = await axios.get('/api/users/me', {
        headers: {
          Authorization: data.token
        }
      });
      console.log(info);
      document.cookie = `authtoken=${data.token}`;
      dispatch(successLogin(info.user));
      if (info.user.role === 'admin') {
        Router.pushRoute('/dashboard');
      } else {
        Router.pushRoute('/home');
      }
    } catch (err) {
      dispatch(failedLogin(err));
    }
  };
};

export const registerAction = user => {
  return dispatch => {
    dispatch(loadRegister());

    setTimeout(function() {
      user.token = 'abcd123';
      user.role = 'admin';

      dispatch(successRegister(user));
    }, 3000);
  };
};

export const logoutAction = () => {
  return dispatch => {
    document.cookie =
      'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(setUserData({}));
    dispatch(successLogout());
    Router.pushRoute('/');
  };
};

export const fetchUserData = token => {
  return async dispatch => {
    console.log('fetch');
    try {
      const { data } = await axios.get('/api/users/me', {
        headers: {
          Authorization: token
        }
      });
      dispatch(setUserData(data.user));
    } catch (err) {
      console.log(err.response || err);
    }
  };
};

export const setUserData = userData => {
  return {
    type: SET_USER_DATA,
    userData
  };
};
