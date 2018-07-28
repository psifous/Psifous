import {
  LOGIN_SUCCESS,
  LOGIN_LOAD,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_LOAD,
  REGISTER_FAILED,
  LOGOUT_LOAD,
  LOGOUT_SUCCESS
} from './actionTypes';

export const successLogin = (data) => {
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

export const failedLogin = (err) => {
  return {
    type: LOGIN_FAILED,
    error: err
  };
};

export const loadRegister = () => {
  return {
    type: REGISTER_LOAD,
  };
};

export const successRegister = (userData) => {
  return {
    type: REGISTER_SUCCESS,
    payload: userData
  };
};

export const failedRegister = (err) => {
  return {
    type: REGISTER_FAILED,
    error: err
  };
};

export const loadLogout = () => {
  return {
    type: LOGOUT_LOAD,
  };
};

export const successLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginAction = (user) => {
  return (dispatch) => {
    dispatch(loadLogin())
    
    setTimeout(function(){ 
      if(user.unamemail === 'admin' || user.unamemail === 'admin@mail.com'){
        if(user.password === '123') {
          let userData = {
            name: 'Leni Diana',
            username: 'admin',
            email: 'admin@mail.com',
            password: '123',
            birthdate: '12-12-1999',
            token: 'abcd123',
            role: 'admin'
          };

          dispatch(successLogin(userData))
        } else {
          dispatch(failedLogin('wrong password'))
        };
      } else {
        dispatch(failedLogin('not found email or username'))
      };

    }, 3000);

  };
};

export const registerAction = (user) => {
  return (dispatch) => {
    dispatch(loadRegister())

    setTimeout(function(){ 
        user.token = 'abcd123';
        user.role = 'admin';

        dispatch(successRegister(user))
    }, 3000);
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(loadLogout())

    setTimeout(function(){ 
        dispatch(successLogout())
    }, 2000);
  };
};