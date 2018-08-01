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

import {
  showErrorMessages,
  startLoading,
  stopLoading,
  showSuccessMessage
} from './../ui/uiActions';
import web3 from '@/ethereum/web3';

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
      const { data: info } = await axios.get('/api/users/me', {
        headers: {
          Authorization: data.token
        }
      });
      document.cookie = `authtoken=${data.token}`;
      dispatch(successLogin(info.user));
      if (info.user.role === 'admin') {
        Router.pushRoute('/dashboard');
      } else {
        Router.pushRoute('/home');
      }
    } catch (err) {
      dispatch(failedLogin(err));
      if (err.response) {
        if (err.response.status === 400) {
          dispatch(showErrorMessages(['Wrong username or Password']));
        } else if (err.response.status === 500) {
          dispatch(showErrorMessages(['Login failed, please try again']));
        }
      }
    }
  };
};

export const registerVoter = registrationData => {
  return async dispatch => {
    try {
      dispatch(startLoading());
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        dispatch(stopLoading());
        dispatch(showErrorMessages(['Please install Metamask to register']));
        return;
      }
      registrationData.blockchainAddress = accounts[0];
      const { data } = await axios.post('/api/users', registrationData);
      dispatch(stopLoading());
      dispatch(showSuccessMessage(['Registered as Voter successfully']));
      Router.pushRoute('/login');
    } catch (err) {
      dispatch(stopLoading());
      console.log(err);
      if (err.response) {
        if (err.response.status === 400) {
          dispatch(showErrorMessages(['Invalid registration fields']));
        } else {
          dispatch(
            showErrorMessages(['Registration failed, please try again'])
          );
        }
      } else {
        dispatch(showErrorMessages(['Registration failed, please try again']));
      }
    }
  };
};

export const registerOrganizer = (adminData, communityData) => {
  return async dispatch => {
    try {
      dispatch(startLoading());
      const { data: community } = await axios.post('/api/communities', {
        name: communityData.communityName,
        location: communityData.communityLocation,
        AdminId: 0
      });

      const communityId = community.value.id;

      adminData.CommunityId = communityId;

      const { data: admin } = await axios.post('/api/admins', adminData);

      const { data } = await axios.put(`/api/communities/${communityId}`, {
        AdminId: admin.value.id
      });
      dispatch(stopLoading());
      await dispatch(
        showSuccessMessage(['Registered as Organizer successfully'])
      );

      Router.pushRoute('/login');
    } catch (err) {
      dispatch(stopLoading());
      console.log(err);
      if (err.response) {
        if (err.response.status === 400) {
          dispatch(showErrorMessages(['Invalid registration fields']));
        } else {
          dispatch(
            showErrorMessages(['Registration failed, please try again'])
          );
        }
      } else {
        dispatch(showErrorMessages(['Registration failed, please try again']));
      }
    }
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
