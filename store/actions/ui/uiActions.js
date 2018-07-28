import {
  SIDEBAR_HANDLE,
  SIDEBAR_CLOSE
} from './actionTypes';

export const sidebarOpen = () => {
  return {
    type: SIDEBAR_HANDLE
  }
};

export const sidebarClose = () => {
  return {
    type: SIDEBAR_CLOSE
  }
};

export const visibleSidebar = () => {
  return (dispatch) => {
    dispatch(sidebarOpen())    
  };
};

export const hiddenSidebar = () => {
  return (dispatch) => {
    dispatch(sidebarClose())    
  };
};