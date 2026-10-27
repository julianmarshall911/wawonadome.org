import { combineSlices, configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import authSlice from './authSlice';
import dataSlice from './dataSlice';

const rootReducer = combineSlices(authSlice, dataSlice, alertSlice);

export const makeStore = preloadedState =>
  configureStore({ reducer: rootReducer, preloadedState });

export const store = makeStore();
