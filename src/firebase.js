import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Safe environment variable retriever that supports both Vite bundling and raw unbundled browser loading
const getEnv = (key, fallback) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {}
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY', ""),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN', "gkgumus.firebaseapp.com"),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID', "gkgumus"),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET', "gkgumus.appspot.com"),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', ""),
  appId: getEnv('VITE_FIREBASE_APP_ID', "")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc };
export default db;
