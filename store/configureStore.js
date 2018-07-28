import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducers from './reducers';

const initializeStrore = () => {
  const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

  return store;
}

export default initializeStrore
