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
  "auth/invalid-email": "Die E-Mail-Adresse ist ungültig.",
  "auth/operation-not-allowed": "E-Mail/Passwort-Konten sind nicht aktiviert.",
  "auth/weak-password": "Das Passwort ist zu schwach.",
  "auth/user-not-found": "Kein Benutzer mit dieser E-Mail-Adresse gefunden.",
  "auth/wrong-password": "Falsches Passwort. Bitte versuche es erneut.",
  "auth/user-disabled": "Dieses Benutzerkonto wurde deaktiviert.",
  "auth/popup-blocked":
    "Ups, dein Browser hat das Popup blockiert. Erlaube bitte Popups für diese Seite.",
  "auth/popup-closed-by-user":
    "Du hast das Popup geschlossen, bevor wir fertig waren. Versuch's bitte nochmal.",
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
