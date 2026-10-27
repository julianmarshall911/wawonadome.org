import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const env = import.meta.env;

const app = initializeApp({
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
});

const auth = getAuth(app);

// Firestore is only needed once someone is logged in, so keep it out of the
// initial bundle.
let firestore;
const loadFirestore = async () => {
  const module = await import('firebase/firestore');
  firestore ??= module.getFirestore(app);
  return { firestore, ...module };
};

export const onAuthChanged = callback => onAuthStateChanged(auth, callback);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const sendPasswordResetEmail = email =>
  firebaseSendPasswordResetEmail(auth, email);

export const getUserData = async email => {
  const { firestore, collection, query, where, limit, getDocs } =
    await loadFirestore();
  const snapshot = await getDocs(
    query(
      collection(firestore, 'members'),
      where('email', '==', email),
      limit(1),
    ),
  );
  return snapshot.empty ? null : snapshot.docs[0].data();
};
