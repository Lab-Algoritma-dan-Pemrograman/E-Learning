import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { clearToken } from './services/tokenService';
import firebaseConfigJson from '../firebase-applet-config.json';

// Support for environment variables (useful for Vercel/Production)
// Priority: JSON Config (if valid) > Env Vars
const isJsonConfigValid = firebaseConfigJson.apiKey && !firebaseConfigJson.apiKey.includes('MASUKKAN');

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

// Only use env vars if JSON config is invalid/missing
if (!isJsonConfigValid) {
  if (import.meta.env.VITE_FIREBASE_API_KEY) firebaseConfig.apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) firebaseConfig.authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID) firebaseConfig.projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) firebaseConfig.storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  if (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) firebaseConfig.messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
  if (import.meta.env.VITE_FIREBASE_APP_ID) firebaseConfig.appId = import.meta.env.VITE_FIREBASE_APP_ID;
  if (import.meta.env.VITE_FIREBASE_DATABASE_ID) firebaseConfig.firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;
  if (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) firebaseConfig.measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
}

// Initialize Firebase SDK
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('MASUKKAN')) {
  console.warn('Firebase API Key is missing or using placeholder. Firestore will not work.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

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
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Logout: Clear the JWT token session.
 * User will need to re-access from web utama to get a new token.
 */
export const logout = async () => {
  clearToken();
  window.location.reload();
};

