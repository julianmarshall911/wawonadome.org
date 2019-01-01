import ActionTypes from './ActionTypes';
import Firebase from '../data/Firebase';
import { displayError, displaySuccess } from './AlertActions';
import { fetchUserData } from './DataActions';

export const initialize = userData => dispatch => {
  if (!userData) {
    dispatch(initLoggedOut());
  }
  dispatch(initLoggedIn(userData));
};

export const initLoggedIn = userData => ({
  type: ActionTypes.INIT_LOGGED_IN,
  payload: userData,
});

export const initLoggedOut = () => ({
  type: ActionTypes.INIT_LOGGED_OUT,
});

// LOGIN DIALOG STATE

export const openLoginDialog = () => ({
  type: ActionTypes.LOGIN_DIALOG_OPENED,
});

export const closeLoginDialog = () => ({
  type: ActionTypes.LOGIN_DIALOG_CLOSED,
});

// LOGGING IN

export const beginLogin = () => ({
  type: ActionTypes.LOGIN_STARTED,
});

export const completeLogin = profileInfo => ({
  type: ActionTypes.LOGIN_COMPLETED,
  payload: profileInfo,
});

export const failLogin = () => ({
  type: ActionTypes.LOGIN_FAILED,
});

export const login = ({
  email = undefined,
  password = undefined,
  then = () => {},
}) => dispatch => {
  dispatch(beginLogin());
  Firebase.login(email, password)
    .then(result => {
      dispatch(completeLogin(result.user));
      dispatch(displaySuccess('Successfully logged in'));
      fetchUserData(email)(dispatch);
      then();
    })
    .catch(err => {
      dispatch(failLogin());
      dispatch(displayError(err.message));
    });
};

// LOGGING OUT

export const beginLogout = () => ({
  type: ActionTypes.LOGOUT_STARTED,
});

export const completeLogout = () => ({
  type: ActionTypes.LOGOUT_COMPLETED,
});

export const failLogout = () => ({
  type: ActionTypes.LOGOUT_FAILED,
});

export const logout = (then = () => {}) => dispatch => {
  dispatch(beginLogout());
  Firebase.auth
    .signOut()
    .then(() => {
      dispatch(completeLogout());
      then();
    })
    .catch(err => {
      dispatch(displayError(err.message));
      dispatch(failLogout());
    });
};
