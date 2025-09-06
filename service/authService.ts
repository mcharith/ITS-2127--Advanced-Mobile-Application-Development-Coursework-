import { auth } from "@/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";

export const register = async (name: string, email: string, password: string) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  if (userCred.user) {
    await updateProfile(userCred.user, {
      displayName: name,
    });
  }

  return userCred;
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};