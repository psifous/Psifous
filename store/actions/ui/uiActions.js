import {
  DRAWER_OPEN,
  DRAWER_CLOSE
} from './actionTypes';

export const drawerOpen = () => {
  return {
    type: DRAWER_OPEN
  }
};

export const drawerClose = () => {
  return {
    type: DRAWER_CLOSE
  }
};

export const openDrawer = () => {
  return (dispatch) => {
    dispatch(drawerOpen())    
  };
};

export const closeDrawer = () => {
  return (dispatch) => {
    dispatch(drawerClose())    
  };
};