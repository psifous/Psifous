import {
  SIDEBAR_HANDLE,
  SIDEBAR_CLOSE,
  CONFIRMATION_OPEN,
  CONFIRMATION_CLOSE,
  OPEN_MODAL,
  CLOSE_MODAL,
  START_LOADING,
  STOP_LOADING
} from './actionTypes';

import { toast } from 'react-toastify';

export const sidebarOpen = () => {
  return {
    type: SIDEBAR_HANDLE
  };
};

export const sidebarClose = () => {
  return {
    type: SIDEBAR_CLOSE
  };
};

export const openConfirmation = () => {
  return {
    type: CONFIRMATION_OPEN
  };
};

export const closeConfirmation = () => {
  return {
    type: CONFIRMATION_CLOSE
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  };
};

export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const visibleSidebar = () => {
  return dispatch => {
    dispatch(sidebarOpen());
  };
};

export const hiddenSidebar = () => {
  return dispatch => {
    dispatch(sidebarClose());
  };
};

export const showErrorMessages = errors => {
  return async dispatch => {
    errors.forEach(error => {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
      });
    });
  };
};

export const showSuccessMessages = messages => {
  return async dispatch => {
    messages.forEach(message => {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
    });
  };
};

export const showSuccessMessage = message => {
  return async dispatch => {
    return toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };
};

export const showInfoMessages = messages => {
  return async dispatch => {
    messages.forEach(message => {
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER
      });
    });
  };
};

export const showInfoMessage = message => {
  return async dispatch => {
    return toast.info(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };
};

export const showProgressMessage = message => {
  return async dispatch => {
    return toast(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
};
