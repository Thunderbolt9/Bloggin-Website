// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0gsPI3vr7dk7hQdHKRYyQwa7XYIQ5FfI",
  authDomain: "blogging-site-4224b.firebaseapp.com",
  databaseURL: "https://blogging-site-4224b-default-rtdb.firebaseio.com",
  projectId: "blogging-site-4224b",
  storageBucket: "blogging-site-4224b.appspot.com",
  messagingSenderId: "861053611663",
  appId: "1:861053611663:web:7774fabb89ab96f61b4afa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export
export default app;
