// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-q010_WuYrgBVi-NE_4kB8FrUEMia_s",
  authDomain: "expenses-tracker-app-68931.firebaseapp.com",
  projectId: "expenses-tracker-app-68931",
  storageBucket: "expenses-tracker-app-68931.firebasestorage.app",
  messagingSenderId: "588336667445",
  appId: "1:588336667445:web:30b5313b16ce403a14ca7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
