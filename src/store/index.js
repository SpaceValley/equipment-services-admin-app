import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../store/app';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const reducers = combineReducers({
  appReducer
});

const store = configureStore({
  reducer: reducers,
  middleware: middlewares
});

export default store;
