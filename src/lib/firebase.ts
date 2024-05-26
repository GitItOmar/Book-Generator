import firebaseApp from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";

export const auth = getAuth(firebaseApp);

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, uid: userCredential.user.uid };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, uid: null };
  }
};

export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    return { success: true, uid: userCredential.user.uid };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, uid: null };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, uid: userCredential.user.uid };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, uid: null };
  }
};
