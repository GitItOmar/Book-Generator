"use server";

import { handleAuthAction, PrevState } from "@/lib/authUtils";

export default async function createUserAction(
  prevState: PrevState,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  return handleAuthAction("signUp", email, password);
}
