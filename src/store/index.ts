import { combineSlices, configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import authSlice from './authSlice';
import dataSlice from './dataSlice';

const rootReducer = combineSlices(authSlice, dataSlice, alertSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
