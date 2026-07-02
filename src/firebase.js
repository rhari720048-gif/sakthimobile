import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDng5P4M4_q8RCWqFRcyQDW0cE3vYOpt8w",
  authDomain: "sakthi-mobiles-27d6f.firebaseapp.com",
  projectId: "sakthi-mobiles-27d6f",
  storageBucket: "sakthi-mobiles-27d6f.firebasestorage.app",
  messagingSenderId: "15519654940",
  appId: "1:15519654940:web:9899753d1abd3f206e6bd9",
  measurementId: "G-PBSYHXPWT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
