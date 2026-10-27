import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as Firebase from '../data/Firebase';
import { authStateChanged, logout } from './authSlice';

const EMPTY_ENTRY = { status: 'idle', data: null };

export const fetchUserData = createAsyncThunk(
  'data/fetchUserData',
  email => Firebase.getUserData(email),
  {
    // Skip the request if it's already loaded or in flight.
    condition: (email, { getState }) => {
      const { status } = selectUserData(getState(), email);
      return status !== 'pending' && status !== 'complete';
    },
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState: { byEmail: {} },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, (state, { meta }) => {
        state.byEmail[meta.arg] = { status: 'pending', data: null };
      })
      .addCase(fetchUserData.fulfilled, (state, { meta, payload }) => {
        state.byEmail[meta.arg] = { status: 'complete', data: payload };
      })
      .addCase(fetchUserData.rejected, (state, { meta }) => {
        state.byEmail[meta.arg] = { status: 'failed', data: null };
      })
      .addMatcher(
        isAnyOf(
          logout.fulfilled,
          action => authStateChanged.match(action) && !action.payload,
        ),
        state => {
          state.byEmail = {};
        },
      );
  },
});

export const selectUserData = (state, email) =>
  state[dataSlice.reducerPath].byEmail[email] ?? EMPTY_ENTRY;

export default dataSlice;
