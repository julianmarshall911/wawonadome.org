'use es6';

import { createSelector } from 'reselect';
import { getUser } from './AuthSelectors';

export const getUserData = state => state.get('userData');

export const getLoggedInUserData = createSelector(
  [getUserData, getUser],
  (userData, loggedInUser) => userData.get(loggedInUser.displayName),
);

export const getGroupUserData = createSelector(
  [getUserData],
  userData => userData.get('Wassociates'),
);
