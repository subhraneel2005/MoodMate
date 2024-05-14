import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbdfqL1AYGzJfqkiU7TZiebPQFrPSfz_8",
  authDomain: "mood-mate-e3b8a.firebaseapp.com",
  projectId: "mood-mate-e3b8a",
  storageBucket: "mood-mate-e3b8a.appspot.com",
  messagingSenderId: "705685055448",
  appId: "1:705685055448:web:fb165ad188b84327e534ad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);