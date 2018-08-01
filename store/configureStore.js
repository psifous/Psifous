import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducers, { rootInitialState } from './reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'production') {
  middlewares.push(logger);
}

const initializeStrore = (initialState = rootInitialState) => {
  const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

export default initializeStrore;
