import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcRZJf2QKT2C7eiCRdQFj30W9SUl7O-XY",
  authDomain: "whatamess-a322e.firebaseapp.com",
  projectId: "whatamess-a322e",
  storageBucket: "whatamess-a322e.appspot.com",
  messagingSenderId: "98224723115",
  appId: "1:98224723115:web:baac3d9d6ca3c74f5dd3ee",
  measurementId: "G-9T22FL4PXM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
