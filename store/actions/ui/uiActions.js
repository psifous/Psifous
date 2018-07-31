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
