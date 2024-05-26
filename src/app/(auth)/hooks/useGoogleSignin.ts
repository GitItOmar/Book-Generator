import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { googleSignin } from '@/lib/firebase';
import { createSession } from '@/actions/authActions';

const useGoogleSignin = () => {
  const router = useRouter();

  const signinWithGoogle = async () => {
    const { success, error, uid } = await googleSignin();

    if (success && uid) {
      await createSession(uid);
      router.push("/");
    } else {
      toast.error(error);
    }
  };

  return { signinWithGoogle };
};

export default useGoogleSignin;
