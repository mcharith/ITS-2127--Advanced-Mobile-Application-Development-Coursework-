import { auth, db } from "@/firebase";
import { UserType } from "@/types";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const register = async (name: string, email: string, password: string) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  if (userCred.user) {
    await updateProfile(userCred.user, { displayName: name });

    
    await setDoc(doc(db, "users", userCred.user.uid), {
      uid: userCred.user.uid,
      email,
      name,
      image: null,
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

export const updateUserData = async (uid: string, setUser: (user: UserType) => void) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData: UserType = {
        uid: data?.uid || uid,
        email: data?.email || null,
        name: data?.name || null,
        image: data?.image || null,
      };
      setUser(userData);
    }
  } catch (error: any) {
    console.log("error updating user data: ", error);
  }
};