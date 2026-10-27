import { initializeApp } from 'firebase/app';
import {
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
let firestore: Firestore | undefined;
const loadFirestore = async () => {
  const module = await import('firebase/firestore');
  firestore ??= module.getFirestore(app);
  return { firestore, ...module };
};

export const onAuthChanged = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const sendPasswordResetEmail = (email: string) =>
  firebaseSendPasswordResetEmail(auth, email);

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
