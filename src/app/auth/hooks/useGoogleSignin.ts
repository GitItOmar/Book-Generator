import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { googleSignin } from "@/lib/firebase";
import firebaseAdminApp from "@/config/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth(firebaseAdminApp);

const useGoogleSignin = () => {
  const router = useRouter();

  const signinWithGoogle = async () => {
    const { success, error, token } = await googleSignin();

    if (success && token) {
      await auth.createSessionCookie(token, { expiresIn: 60 * 60 * 24 });
      router.push("/");
    } else {
      toast.error(error);
    }
  };

  return { signinWithGoogle };
};

export default useGoogleSignin;
