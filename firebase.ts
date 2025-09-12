import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo-q010_WuYrgBVi-NE_4kB8FrUEMia_s",
  authDomain: "expenses-tracker-app-68931.firebaseapp.com",
  projectId: "expenses-tracker-app-68931",
  storageBucket: "expenses-tracker-app-68931.appspot.com", 
  messagingSenderId: "588336667445",
  appId: "1:588336667445:web:30b5313b16ce403a14ca7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;