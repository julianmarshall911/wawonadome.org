import { type FirebaseApp, initializeApp } from 'firebase/app';
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// Shape of a document in the Firestore `members` collection.
export interface MemberData {
  email: string;
  displayName?: string;
  links?: Record<string, string>;
}

const env = import.meta.env;

// Without a config (e.g. no .env.local in development) the public pages still
// render; logging in fails with a clear message instead of crashing the app.
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
if (env.REACT_APP_API_KEY) {
  app = initializeApp({
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    databaseURL: env.REACT_APP_DATABASE_URL,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  });
  auth = getAuth(app);
} else {
  console.warn(
    'Firebase is not configured, so logging in is disabled. Copy .env.example to .env.local and fill in the values.',
  );
}

const requireApp = () => {
  if (!app || !auth) {
    throw new Error(
      "Logging in isn't available right now: the site is missing its Firebase settings.",
    );
  }
  return { app, auth };
};

// Firestore is only needed once someone is logged in, so keep it out of the
// initial bundle.
let firestore: Firestore | undefined;
const loadFirestore = async () => {
  const { app } = requireApp();
  const module = await import('firebase/firestore');
  firestore ??= module.getFirestore(app);
  return { firestore, ...module };
};

export const onAuthChanged = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

export const login = async (email: string, password: string) =>
  signInWithEmailAndPassword(requireApp().auth, email, password);

export const logout = async () => {
  if (auth) {
    await signOut(auth);
  }
};

export const sendPasswordResetEmail = async (email: string) =>
  firebaseSendPasswordResetEmail(requireApp().auth, email);

export const getUserData = async (
  email: string,
): Promise<MemberData | null> => {
  const { firestore, collection, query, where, limit, getDocs } =
    await loadFirestore();
  const snapshot = await getDocs(
    query(
      collection(firestore, 'members'),
      where('email', '==', email),
      limit(1),
    ),
  );
  const doc = snapshot.docs[0];
  return doc ? (doc.data() as MemberData) : null;
};
