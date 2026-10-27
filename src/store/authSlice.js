import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Firebase from '../data/Firebase';

// Firebase User objects aren't serializable, so only keep what we use.
const toUser = user =>
  user && {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) =>
    toUser((await Firebase.login(email, password)).user),
);

export const logout = createAsyncThunk('auth/logout', () => Firebase.logout());

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async email => {
    await Firebase.sendPasswordResetEmail(email);
    return email;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    initialized: false,
    user: null,
    loginPending: false,
    logoutPending: false,
    loginDialogOpen: false,
  },
  reducers: {
    authStateChanged(state, { payload }) {
      state.initialized = true;
      state.user = payload;
    },
    openLoginDialog(state) {
      state.loginDialogOpen = true;
    },
    closeLoginDialog(state) {
      state.loginDialogOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginPending = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginPending = false;
        state.loginDialogOpen = false;
        state.user = payload;
      })
      .addCase(login.rejected, state => {
        state.loginPending = false;
      })
      .addCase(logout.pending, state => {
        state.logoutPending = true;
      })
      .addCase(logout.fulfilled, state => {
        state.logoutPending = false;
        state.user = null;
      })
      .addCase(logout.rejected, state => {
        state.logoutPending = false;
      });
  },
  selectors: {
    selectAuthInitialized: state => state.initialized,
    selectUser: state => state.user,
    selectIsLoggedIn: state => state.initialized && !!state.user,
    selectLoginPending: state => state.loginPending,
    selectLogoutPending: state => state.logoutPending,
    selectLoginDialogOpen: state => state.loginDialogOpen,
  },
});

export const { authStateChanged, openLoginDialog, closeLoginDialog } =
  authSlice.actions;

export const {
  selectAuthInitialized,
  selectUser,
  selectIsLoggedIn,
  selectLoginPending,
  selectLogoutPending,
  selectLoginDialogOpen,
} = authSlice.selectors;

export const listenForAuthChanges = () => dispatch =>
  Firebase.onAuthChanged(user => dispatch(authStateChanged(toUser(user))));

export default authSlice;
