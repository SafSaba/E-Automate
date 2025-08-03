
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A function to initialize Firebase, ensuring it only runs once.
const getFirebaseApp = (): FirebaseApp => {
  if (getApps().length) {
    return getApp();
  }
  
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId
  ) {
    const errorMessage = 'Missing Firebase configuration. Check your environment variables. Make sure NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set.';
    console.error(errorMessage);
    // Throw an error on the server but not on the client
    if (typeof window === 'undefined') {
        throw new Error(errorMessage);
    }
  }
  
  return initializeApp(firebaseConfig);
}

const app: FirebaseApp = getFirebaseApp();
let auth: Auth;
let db: Firestore;

// Lazily initialize Firebase services to ensure they are only created when needed.
// This is a robust pattern for Next.js environments.
const getFirebaseAuth = (): Auth => {
    if (!auth) {
        auth = getAuth(app);
    }
    return auth;
}

const getFirebaseDb = (): Firestore => {
    if (!db) {
        db = getFirestore(app);
    }
    return db;
}


export { app, getFirebaseAuth, getFirebaseDb };
