'use es6';

import ActionTypes from './ActionTypes';

export const displayAlert = ({ message, variant = 'success' }) => ({
  type: ActionTypes.DISPLAY_ALERT,
  payload: { message, variant },
});

export const displaySuccess = message =>
  displayAlert({ message, variant: 'success' });

export const displayError = message =>
  displayAlert({ message, variant: 'error' });

export const closeAlert = () => ({
  type: ActionTypes.CLOSE_ALERT,
});
