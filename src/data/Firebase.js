'use es6';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { initLoggedOut, initialize } from '../actions/AuthActions';
import { store } from '../stores/ReduxStore';
import { getInitialized } from '../selectors/AuthSelectors';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.reduxStore = store;
    this.auth = app.auth();

    this.auth.onAuthStateChanged(user => {
      const state = this.reduxStore.getState();
      if (!getInitialized(state)) {
        if (user) {
          initialize(user)(this.reduxStore.dispatch);
        } else {
          this.reduxStore.dispatch(initLoggedOut());
        }
      }
    });

    const settings = { timestampsInSnapshots: true };
    this.firestore = app.firestore();
    this.firestore.settings(settings);
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.auth.signOut();
  }

  getUserData(email) {
    return this.firestore
      .collection('/members')
      .where('email', '==', email)
      .get();
  }
}

const firebase = new Firebase();
window.firebase = firebase;
export default firebase;
