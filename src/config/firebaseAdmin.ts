import { initializeApp, getApps, cert } from "firebase-admin/app";

function customInitApp() {
  if (getApps().length <= 0) {
    return initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  }

  return getApps()[0];
}

const firebaseAdminApp = customInitApp();

export default firebaseAdminApp;
