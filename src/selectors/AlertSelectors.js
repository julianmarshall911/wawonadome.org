'use es6';
import { createSelector } from 'reselect';

export const getAlert = state => state.get('alert');

export const getIsOpen = createSelector(
  [getAlert],
  alert => !!alert.get('open'),
);

export const getMessage = createSelector(
  [getAlert],
  alert => alert.get('message'),
);

export const getVariant = createSelector(
  [getAlert],
  alert => alert.get('variant'),
);
