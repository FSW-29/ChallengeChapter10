// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBUh8nSDGnRWPqeiMentCtJU1l_f5ckPWo",
  authDomain: "binar-fsw-29.firebaseapp.com",
  databaseURL: "https://binar-fsw-29-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binar-fsw-29",
  storageBucket: "binar-fsw-29.appspot.com",
  messagingSenderId: "869942278872",
  appId: "1:869942278872:web:33273fba01a1a024dcf5ad"
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