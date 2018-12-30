'use es6';

const ActionTypes = (types =>
  types.reduce((acc, val) => Object.assign(acc, { [val]: val }), {}))([
  'INIT_LOGGED_IN',
  'INIT_LOGGED_OUT',

  'LOGIN_STARTED',
  'LOGIN_COMPLETED',
  'LOGIN_FAILED',

  'LOGOUT_STARTED',
  'LOGOUT_COMPLETED',
  'LOGOUT_FAILED',

  'USER_VALIDATION_STARTED',
  'USER_VALIDATION_COMPLETED',
  'USER_VALIDATION_FAILED',

  'DISPLAY_ALERT',
  'CLOSE_ALERT',

  'USER_DATA_FETCH_STARTED',
  'USER_DATA_FETCH_COMPLETED',
  'USER_DATA_FETCH_FAILED',
]);

export default ActionTypes;
