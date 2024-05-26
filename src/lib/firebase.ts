import firebaseApp from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import firebaseAdminApp from "@/config/firebaseAdmin";
import { cookies } from "next/headers";

const auth = getAuth(firebaseApp);
const adminAuth = getAdminAuth(firebaseAdminApp);

setPersistence(auth, inMemoryPersistence);

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
    const token = await userCredential.user.getIdToken();
    return { success: true, token };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, token: null };
  }
};

export const googleSignin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const token = await userCredential.user.getIdToken();
    return { success: true, token };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, token: null };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return { success: true, token };
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : authErrorMessages.default;
    return { success: false, error: errorMessage, token: null };
  }
};

export const createSessionCookie = async (idToken: string) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });
  cookies().set({
    name: "session",
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export const verifySessionCookie = async (sessionCookie: string) =>
  adminAuth.verifySessionCookie(sessionCookie, true);
