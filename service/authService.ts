import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

export const register = (name:string,email:string,password:string) => {
    return createUserWithEmailAndPassword(auth,email,password)
}

export const login = (email:string,password:string) => {
    return signInWithEmailAndPassword(auth,email,password)
}

export const logout = () => {
    return signOut(auth)
}