'use es6';

import { createSelector } from 'reselect';
import { getUser } from './AuthSelectors';

export const getUserData = state => state.get('userData');

export const getLoggedInUserData = createSelector(
  [getUserData, getUser],
  (userData, loggedInUser) => userData.get(loggedInUser.email),
);

export const getGroupUserData = createSelector(
  [getUserData],
  userData => userData.get('wassociates@wawonadome.org'),
);

const getDataFetchStatusMap = state => state.get('userDataFetchStatus');

const getUserDataFetchStatus = createSelector(
  [getUser, getDataFetchStatusMap],
  (loggedInUser, dataFetchStatuses) =>
    dataFetchStatuses.get(loggedInUser.email),
);

export const getUserDataFetchPending = createSelector(
  [getUserDataFetchStatus],
  fetchStatus => fetchStatus && fetchStatus.get('pending'),
);

export const getUserDataFetchUninitialized = createSelector(
  [getLoggedInUserData, getUserDataFetchStatus],
  (userData, fetchStatus) =>
    !(
      userData ||
      (fetchStatus &&
        (fetchStatus.get('pending') || fetchStatus.get('complete')))
    ),
);
