import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'e-automate-182bc.firebaseapp.com',
  projectId: 'e-automate-182bc',
  storageBucket: 'e-automate-182bc.appspot.com',
  messagingSenderId: '599608749375',
  appId: '1:599608749375:web:ee17930a7024409e23f78a',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
