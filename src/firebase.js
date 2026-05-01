import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPGcqyHgyJYqTVTFXDpuApgz5OXvzWzd8",
  authDomain: "e-commerce-system-fcbab.firebaseapp.com",
  projectId: "e-commerce-system-fcbab",
  storageBucket: "e-commerce-system-fcbab.firebasestorage.app",
  messagingSenderId: "195111499491",
  appId: "1:195111499491:web:e8cad530f067c40c6a37d6",
  measurementId: "G-XBDGKSZG97"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);