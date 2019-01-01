'use es6';

import { createSelector } from 'reselect';

// State loading

export const getInitialized = state =>
  !!state.get('initialStatus').get('complete');

export const getUser = state => state.get('user');

// Dialog state

export const getDialogIsOpen = state => state.get('loginDialogOpen');

// Verification status

export const getVerificationStatus = state => state.get('loginStatus');

export const getVerificationPending = createSelector(
  [getVerificationStatus],
  loginStatus => loginStatus.get('pending'),
);

export const getVerificationComplete = createSelector(
  [getVerificationStatus],
  loginStatus => loginStatus.get('complete'),
);

export const getVerificationFailed = createSelector(
  [getVerificationStatus],
  loginStatus => loginStatus.get('failed'),
);

export const getVerificationUninitialized = createSelector(
  [getVerificationStatus],
  loginStatus => loginStatus.get('uninitialized'),
);

// Login status

export const getLoginStatus = state => state.get('loginStatus');

export const getLoginPending = createSelector(
  [getLoginStatus],
  loginStatus => loginStatus.get('pending'),
);

export const getLoginComplete = createSelector(
  [getLoginStatus],
  loginStatus => loginStatus.get('complete'),
);

export const getLoginFailed = createSelector(
  [getLoginStatus],
  loginStatus => loginStatus.get('failed'),
);

export const getLoginUninitialized = createSelector(
  [getLoginStatus],
  loginStatus => loginStatus.get('uninitialized'),
);

// Logout status

export const getLogoutStatus = state => state.get('logoutStatus');

export const getLogoutPending = createSelector(
  [getLogoutStatus],
  logoutStatus => logoutStatus.get('pending'),
);

export const getLogoutComplete = createSelector(
  [getLogoutStatus],
  logoutStatus => logoutStatus.get('complete'),
);

export const getLogoutFailed = createSelector(
  [getLogoutStatus],
  logoutStatus => logoutStatus.get('failed'),
);

export const getLogoutUninitialized = createSelector(
  [getLogoutStatus],
  logoutStatus => logoutStatus.get('uninitialized'),
);

export const getAuthStatePending = createSelector(
  [getLoginPending, getLogoutPending, getVerificationPending, getInitialized],
  (login, logout, verification, initialized) =>
    login || logout || verification || !initialized,
);

export const getIsLoggedIn = createSelector(
  [getUser, getAuthStatePending],
  (user, authVolatile) => !!user && !authVolatile,
);
