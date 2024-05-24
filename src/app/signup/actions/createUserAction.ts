"use server";

import { signUp } from "@/lib/firebase";
import { z } from "zod";

interface PrevState {
  message: string;
  errors?: {
    email?: string;
    password?: string;
    general?: string;
  };
}

const emailSchema = z.string().email({ message: "Hey, sieht aus wie eine falsche E-Mail-Adresse!" });
const passwordSchema = z
  .string()
  .min(6, { message: "Dein Passwort muss mindestens 6 Zeichen lang sein" });

const createUserAction = async (prevState: PrevState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  const errors: PrevState["errors"] = {};
  if (!emailValidation.success) {
    errors.email = emailValidation.error.errors[0].message;
  }
  if (!passwordValidation.success) {
    errors.password = passwordValidation.error.errors[0].message;
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "error",
      errors,
    };
  }

  try {
    await signUp(email as string, password as string);
    return { message: "success" };
  } catch (error) {
    return {
      message: "error",
      errors: {
        general: "An unexpected error occurred",
      },
    };
  }
};

export default createUserAction;
