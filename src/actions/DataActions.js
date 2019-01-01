'use es6';
import Firebase from '../data/Firebase';
import ActionTypes from './ActionTypes';
import { displayError } from './AlertActions';

export const beginUserDataFetch = email => ({
  type: ActionTypes.USER_DATA_FETCH_STARTED,
  payload: email,
});

export const completeUserDataFetch = (email, userData) => ({
  type: ActionTypes.USER_DATA_FETCH_COMPLETED,
  payload: { email, userData },
});

export const failUserDataFetch = () => ({
  type: ActionTypes.USER_DATA_FETCH_FAILED,
});

export const fetchUserData = email => dispatch => {
  dispatch(beginUserDataFetch(email));
  Firebase.getUserData(email)
    .then(res => {
      res.docs
        .map(doc => doc.data())
        .forEach(doc => dispatch(completeUserDataFetch(email, doc)));
    })
    .catch(err => {
      dispatch(displayError(err.message));
      dispatch(failUserDataFetch());
    });
};
