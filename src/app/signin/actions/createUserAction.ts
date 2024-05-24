"use server";

import { signUp } from "@/lib/firebase";

interface PrevState {
  message: string;
}

const createUserAction = async (prevState: PrevState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { message: "error" };
  }

  await signUp(email as string, password as string);
  return { message: "success" };
};

export default createUserAction;
