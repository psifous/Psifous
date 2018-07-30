import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducers, { rootInitialState } from './reducers';

const initializeStrore = (initialState = rootInitialState) => {
  const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

  return store;
};

export default initializeStrore;
