import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfigJson from '../firebase-applet-config.json';

// Support for environment variables (useful for Vercel/Production)
const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
  firestoreDatabaseId: firebaseConfigJson.firestoreDatabaseId,
  measurementId: (firebaseConfigJson as any).measurementId
};

// Override with env vars if present and not empty
if (import.meta.env.VITE_FIREBASE_API_KEY) firebaseConfig.apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
if (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) firebaseConfig.authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
if (import.meta.env.VITE_FIREBASE_PROJECT_ID) firebaseConfig.projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
if (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) firebaseConfig.storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
if (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) firebaseConfig.messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
if (import.meta.env.VITE_FIREBASE_APP_ID) firebaseConfig.appId = import.meta.env.VITE_FIREBASE_APP_ID;
if (import.meta.env.VITE_FIREBASE_DATABASE_ID) firebaseConfig.firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;
if (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) firebaseConfig.measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// Initialize Firebase SDK
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('MASUKKAN')) {
  console.warn('Firebase API Key is missing or using placeholder. Authentication will not work.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
};
