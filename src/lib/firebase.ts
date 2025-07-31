import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'e-automate-182bc',
  appId: '1:599608749375:web:ee17930a7024409e23f78a',
  storageBucket: 'e-automate-182bc.firebasestorage.app',
  apiKey: 'AIzaSyAcbsUXaKuHjuiQytlZex80KyAqWEE4jYQ',
  authDomain: 'e-automate-182bc.firebaseapp.com',
  messagingSenderId: '599608749375',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
