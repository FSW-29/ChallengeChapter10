// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'
// import * as dotenv from 'dotenv';
// dotenv.config()

const firebaseConfig = {
  apiKey: "AIzaSyBUh8nSDGnRWPqeiMentCtJU1l_f5ckPWo",
  authDomain: "binar-fsw-29.firebaseapp.com",
  databaseURL: "https://binar-fsw-29-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binar-fsw-29",
  storageBucket: "binar-fsw-29.appspot.com",
  messagingSenderId: "869942278872",
  appId: "1:869942278872:web:33273fba01a1a024dcf5ad"
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Storage instances
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export {
  auth,
  storage,
  database
};

export default initializeApp(firebaseConfig);