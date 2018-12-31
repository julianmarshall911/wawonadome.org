'use es6';

import { Map } from 'immutable';
import ActionTypes from '../actions/ActionTypes';

const status = new Map({
  uninitialized: false,
  pending: false,
  complete: false,
  failed: false,
});

const defaultState = new Map({
  user: null,
  initialStatus: status.set('pending', true),
  loginStatus: status.set('uninitialized', true),
  logoutStatus: status.set('uninitialized', true),
  userVerificationStatus: status.set('uninitialized', true),
  alert: new Map({
    open: false,
    message: 'Alert!',
    variant: 'success',
  }),
  userDataFetchStatus: status.set('uninitialized', true),
  userData: new Map(),
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_STARTED:
      return state.set('loginStatus', status.set('pending', true));

    case ActionTypes.LOGIN_COMPLETED: {
      return state
        .set('loginStatus', status.set('complete', true))
        .set('user', action.payload);
    }

    case ActionTypes.LOGIN_FAILED:
      return state.set('loginStatus', status.set('failed', true));

    case ActionTypes.LOGOUT_STARTED:
      return state.set('logoutStatus', status.set('pending', true));

    case ActionTypes.LOGOUT_COMPLETED: {
      return state
        .set('logoutStatus', status.set('complete', true))
        .set('user', null)
        .set('userDataFetchStatus', status.set('uninitialized', true))
        .set('userData', new Map());
    }

    case ActionTypes.LOGOUT_FAILED:
      return state.set('logoutStatus', status.set('failed', true));

    case ActionTypes.USER_VERIFICATION_STARTED:
      return state.set('userVerificationStatus', status.set('pending', true));

    case ActionTypes.USER_VERIFICATION_COMPLETED: {
      return state
        .set('userVerificationStatus', status.set('complete', true))
        .set('user', null);
    }

    case ActionTypes.USER_VERIFICATION_FAILED:
      return state.set('userVerificationStatus', status.set('failed', true));

    case ActionTypes.INIT_LOGGED_IN:
      return state
        .set('initialStatus', status.set('complete', true))
        .set('user', action.payload);

    case ActionTypes.INIT_LOGGED_OUT:
      return state.set('initialStatus', status.set('complete', true));

    case ActionTypes.USER_DATA_FETCH_STARTED:
      return state.set('userDataFetchStatus', status.set('pending', true));

    case ActionTypes.USER_DATA_FETCH_COMPLETED: {
      const { displayName, userData } = action.payload;
      return state
        .set('userDataFetchStatus', status.set('complete', true))
        .update('userData', dataMap => dataMap.set(displayName, userData));
    }

    case ActionTypes.USER_DATA_FETCH_FAILED:
      return state.set('userDataFetchStatus', status.set('failed', true));

    case ActionTypes.DISPLAY_ALERT:
      return state.set(
        'alert',
        new Map({
          open: true,
          message: action.payload.message,
          variant: action.payload.variant,
        }),
      );

    case ActionTypes.CLOSE_ALERT:
      return state.set('alert', state.get('alert').set('open', false));

    default:
      return state;
  }
};
