'use es6';

import { Map } from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../data/Constants';

const defaultState = new Map({
  user: null,
  initialStatus: RequestStatus.set('pending', true),
  loginStatus: RequestStatus.set('uninitialized', true),
  logoutStatus: RequestStatus.set('uninitialized', true),
  userVerificationStatus: RequestStatus.set('uninitialized', true),
  alert: new Map({
    open: false,
    message: 'Alert!',
    variant: 'success',
  }),
  userDataFetchStatus: new Map(),
  userData: new Map(),
  loginDialogOpen: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_STARTED:
      return state.set('loginStatus', RequestStatus.set('pending', true));

    case ActionTypes.LOGIN_COMPLETED: {
      return state
        .set('loginStatus', RequestStatus.set('complete', true))
        .set('user', action.payload);
    }

    case ActionTypes.LOGIN_FAILED:
      return state.set('loginStatus', RequestStatus.set('failed', true));

    case ActionTypes.LOGOUT_STARTED:
      return state.set('logoutStatus', RequestStatus.set('pending', true));

    case ActionTypes.LOGOUT_COMPLETED: {
      return state
        .set('logoutStatus', RequestStatus.set('complete', true))
        .set('user', null)
        .set('userDataFetchStatus', RequestStatus.set('uninitialized', true))
        .set('userData', new Map());
    }

    case ActionTypes.LOGOUT_FAILED:
      return state.set('logoutStatus', RequestStatus.set('failed', true));

    case ActionTypes.USER_VERIFICATION_STARTED:
      return state.set(
        'userVerificationStatus',
        RequestStatus.set('pending', true),
      );

    case ActionTypes.USER_VERIFICATION_COMPLETED: {
      return state
        .set('userVerificationStatus', RequestStatus.set('complete', true))
        .set('user', null);
    }

    case ActionTypes.USER_VERIFICATION_FAILED:
      return state.set(
        'userVerificationStatus',
        RequestStatus.set('failed', true),
      );

    case ActionTypes.INIT_LOGGED_IN:
      return state
        .set('initialStatus', RequestStatus.set('complete', true))
        .set('user', action.payload);

    case ActionTypes.INIT_LOGGED_OUT:
      return state.set('initialStatus', RequestStatus.set('complete', true));

    case ActionTypes.USER_DATA_FETCH_STARTED:
      return state.update('userDataFetchStatus', statusMap =>
        statusMap.set(action.payload, RequestStatus.set('pending', true)),
      );

    case ActionTypes.USER_DATA_FETCH_COMPLETED: {
      const { email, userData } = action.payload;
      return state
        .update('userDataFetchStatus', statusMap =>
          statusMap.set(email, RequestStatus.set('complete', true)),
        )
        .update('userData', dataMap => dataMap.set(email, userData));
    }

    case ActionTypes.USER_DATA_FETCH_FAILED:
      return state.set(
        'userDataFetchStatus',
        RequestStatus.set('failed', true),
      );

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

    case ActionTypes.LOGIN_DIALOG_OPENED:
      return state.set('loginDialogOpen', true);

    case ActionTypes.LOGIN_DIALOG_CLOSED:
      return state.set('loginDialogOpen', false);

    default:
      return state;
  }
};
