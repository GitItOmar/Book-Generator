import firebaseApp from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";

const auth = getAuth(firebaseApp);

const authErrorMessages: { [key: string]: string } = {
  "auth/email-already-in-use": "Diese E-Mail wird bereits verwendet.",
  "auth/invalid-credential":
    "Deine Anmeldedaten sind ungültig. Bitte überprüfe sie und versuche es erneut.",
  "auth/weak-password": "Das Passwort ist zu schwach.",
  default:
    "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später noch einmal.",
};

const getErrorMessage = (error: FirebaseError) =>
  authErrorMessages[error.code] || authErrorMessages.default;

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage };
  }
};

export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage };
  }
};
