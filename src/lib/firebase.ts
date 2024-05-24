import firebaseApp from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";

const auth = getAuth(firebaseApp);

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return {
            error: "Diese E-Mail wird bereits verwendet.",
            success: false,
          };
        case "auth/invalid-email":
          return { error: "Die E-Mail-Adresse ist ungültig.", success: false };
        case "auth/operation-not-allowed":
          return {
            error: "E-Mail/Passwort-Konten sind nicht aktiviert.",
            success: false,
          };
        case "auth/weak-password":
          return { error: "Das Passwort ist zu schwach.", success: false };
        default:
          return {
            error: "Es ist ein unbekannter Fehler aufgetreten.",
            success: false,
          };
      }
    }

    return {
      error: "Es ist ein unbekannter Fehler aufgetreten.",
      success: false,
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    return error;
  }
};

export default { signUp };
