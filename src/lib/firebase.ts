

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, initializeFirestore, CACHE_SIZE_UNLIMITED, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
import type { FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      };

let app: FirebaseApp | null = null;
// let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;
let analytics: any = null;
let isFirebaseConfigured = false;

const hasEssentialConfig = !!(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket
);

if (hasEssentialConfig) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    // auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
    analytics = getAnalytics(app);
    isFirebaseConfigured = true;
  } catch (e) {
    console.error("Firebase initialization error:", e);
    app = null;
    // auth = null;
    db = null;
    storage = null;
    functions = null;
    isFirebaseConfigured = false;
  }
}

if (!isFirebaseConfigured) {
    console.warn("Firebase is not configured or failed to initialize. Please check your Firebase project setup. Database and storage features will be disabled.");
}

export { app, db, storage, functions, analytics, isFirebaseConfigured };
