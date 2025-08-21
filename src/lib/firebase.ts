
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, type Functions, httpsCallable } from "firebase/functions";
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
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;
let analytics: any = null;
let isFirebaseConfigured = false;

// Helper function to check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Helper function to initialize Firebase
const initializeFirebase = () => {
  const hasEssentialConfig = !!(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket
  );

  if (!hasEssentialConfig) {
    console.warn("Essential Firebase configuration is missing. Please check your environment variables.");
    return false;
  }

  try {
    // Initialize Firebase App
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize Firestore (works on both server and client)
    db = getFirestore(app);
    
    // Initialize Storage (works on both server and client)  
    storage = getStorage(app);
    
    // Initialize Functions (works on both server and client)
    functions = getFunctions(app);
    
    // Initialize Analytics only in browser environment
    if (isBrowser && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        console.warn("Failed to initialize Firebase Analytics:", analyticsError);
      }
    }
    
    isFirebaseConfigured = true;
    return true;
  } catch (e) {
    console.error("Firebase initialization error:", e);
    app = null;
    db = null;
    storage = null;
    functions = null;
    analytics = null;
    isFirebaseConfigured = false;
    return false;
  }
};

// Initialize Firebase immediately if in browser, or when called from client-side code
if (isBrowser) {
  initializeFirebase();
} else {
  // For server-side, initialize without analytics
  const hasEssentialConfig = !!(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket
  );

  if (hasEssentialConfig) {
    try {
      app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      db = getFirestore(app);
      storage = getStorage(app);
      functions = getFunctions(app);
      isFirebaseConfigured = true;
    } catch (e) {
      console.error("Server-side Firebase initialization error:", e);
      isFirebaseConfigured = false;
    }
  }
}

// Function to ensure Firebase is initialized (for client-side components)
export const ensureFirebaseInitialized = () => {
  if (!isFirebaseConfigured && isBrowser) {
    return initializeFirebase();
  }
  return isFirebaseConfigured;
};

// Firebase Functions utilities
export const submitWaitlistEntry = async (data: {
  name: string;
  email: string;
  feature: string;
  product: string;
}) => {
  ensureFirebaseInitialized();
  if (!functions) {
    throw new Error('Firebase functions not initialized');
  }
  
  const submitWaitlist = httpsCallable(functions, 'submitWaitlistEntry');
  return await submitWaitlist(data);
};

export const submitContactLead = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}) => {
  ensureFirebaseInitialized();
  if (!functions) {
    throw new Error('Firebase functions not initialized');
  }
  
  const submitContact = httpsCallable(functions, 'submitContactLead');
  return await submitContact(data);
};

export const submitNewsletterSubscription = async (data: {
  email: string;
  name?: string;
  source?: string;
}) => {
  ensureFirebaseInitialized();
  if (!functions) {
    throw new Error('Firebase functions not initialized');
  }
  
  const submitNewsletter = httpsCallable(functions, 'submitNewsletterSubscription');
  return await submitNewsletter(data);
};

export { app, db, storage, functions, analytics, isFirebaseConfigured };
