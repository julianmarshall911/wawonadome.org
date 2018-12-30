'use es6';
import Firebase from '../data/Firebase';
import ActionTypes from './ActionTypes';

export const beginUserDataFetch = () => ({
  type: ActionTypes.USER_DATA_FETCH_STARTED,
});

export const completeUserDataFetch = (displayName, userData) => ({
  type: ActionTypes.USER_DATA_FETCH_COMPLETED,
  payload: { displayName, userData },
});

export const failUserDataFetch = () => ({
  type: ActionTypes.USER_DATA_FETCH_FAILED,
});

export const fetchUserData = displayName => dispatch => {
  dispatch(beginUserDataFetch());
  Firebase.getUserData(displayName)
    .then(res => {
      res.docs
        .map(doc => doc.data())
        .forEach(doc => dispatch(completeUserDataFetch(displayName, doc)));
    })
    .catch(dispatch(failUserDataFetch()));
};
