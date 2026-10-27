import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Firebase from '../data/Firebase';
import type { MemberData } from '../data/Firebase';
import type { RootState } from '.';
import { authStateChanged, logout } from './authSlice';

export interface UserDataEntry {
  status: 'idle' | 'pending' | 'complete' | 'failed';
  data: MemberData | null;
}

interface DataState {
  byEmail: Record<string, UserDataEntry>;
}

const EMPTY_ENTRY: UserDataEntry = { status: 'idle', data: null };

export const fetchUserData = createAsyncThunk.withTypes<{
  state: RootState;
}>()('data/fetchUserData', (email: string) => Firebase.getUserData(email), {
  // Skip the request if it's already loaded or in flight.
  condition: (email, { getState }) => {
    const { status } = selectUserData(getState(), email);
    return status !== 'pending' && status !== 'complete';
  },
});

const initialState: DataState = { byEmail: {} };

const dataSlice = createSlice({
  name: 'data',
  initialState,
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
      .addCase(logout.fulfilled, state => {
        state.byEmail = {};
      })
      .addCase(authStateChanged, (state, { payload }) => {
        if (!payload) {
          state.byEmail = {};
        }
      });
  },
});

export const selectUserData = (
  state: RootState,
  email: string,
): UserDataEntry => state.data.byEmail[email] ?? EMPTY_ENTRY;

export default dataSlice;
