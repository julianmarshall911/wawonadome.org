import ActionTypes from './ActionTypes';
import Firebase from '../data/Firebase';
import { displayError, displaySuccess } from './AlertActions';

export const initialize = userData => dispatch => {
  if (!userData) {
    dispatch(initLoggedOut());
  }
  verifyValidUser({ user: userData }, dispatch, () =>
    dispatch(initLoggedIn(userData)),
  );
};

export const initLoggedIn = userData => ({
  type: ActionTypes.INIT_LOGGED_IN,
  payload: userData,
});

export const initLoggedOut = () => ({
  type: ActionTypes.INIT_LOGGED_OUT,
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

export const login = (then = () => {}) => dispatch => {
  dispatch(beginLogin());
  Firebase.auth
    .signInWithPopup(Firebase.googleProvider())
    .then(result => {
      verifyValidUser(result, dispatch, () => {
        dispatch(completeLogin(result.user));
        dispatch(displaySuccess('You are now logged in'));
        then();
      });
    })
    .catch(err => {
      dispatch(failLogin());
      dispatch(displayError('Login failed'));
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
      dispatch(displaySuccess('You are now logged out'));
      then();
    })
    .catch(() => dispatch(failLogout()));
};

// VERIFY USER

export const beginUserValidation = () => ({
  type: ActionTypes.USER_VALIDATION_STARTED,
});

export const completeUserValidation = () => ({
  type: ActionTypes.USER_VALIDATION_COMPLETED,
});

export const failUserValidation = () => ({
  type: ActionTypes.USER_VALIDATION_FAILED,
});

export const verifyValidUser = (result, dispatch, then = () => {}) => {
  dispatch(beginUserValidation());
  Firebase.findUser(result.user.email)
    .then(querySnapshot => {
      const isAcceptedEmail =
        querySnapshot.docs
          .flatMap(doc => doc.data().emails)
          .filter(email => email === result.user.email).length === 1;

      if (isAcceptedEmail) {
        dispatch(completeUserValidation());
        then();
      } else {
        dispatch(failUserValidation());
        dispatch(displayError('User validation failed'));
        logout()(dispatch);
      }
    })
    .catch(err => {
      dispatch(failUserValidation());
      dispatch(displayError('User validation failed'));
      logout()(dispatch);
    });
};
