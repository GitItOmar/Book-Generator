import { z } from "zod";
import { signIn, signUp } from "@/lib/firebase";

export interface PrevState {
  message: string;
  errors?: {
    email?: string;
    password?: string;
    toast?: string;
  };
}

const emailSchema = z
  .string()
  .email({ message: "Hey, sieht aus wie eine falsche E-Mail-Adresse!" });
const passwordSchema = z
  .string()
  .min(6, { message: "Dein Passwort muss mindestens 6 Zeichen lang sein" });

export const validateFormData = (email: string, password: string) => {
  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  const errors: PrevState["errors"] = {};
  if (!emailValidation.success) {
    errors.email = emailValidation.error.errors[0].message;
  }
  if (!passwordValidation.success) {
    errors.password = passwordValidation.error.errors[0].message;
  }

  return errors;
};

export const handleAuthAction = async (
  action: "signIn" | "signUp",
  email: string,
  password: string
) => {
  const errors = validateFormData(email, password);

  if (Object.keys(errors).length > 0) {
    return {
      message: "error",
      errors,
    };
  }

  const authFunction = action === "signIn" ? signIn : signUp;
  const { success, error } = await authFunction(email, password);
  return { message: success ? "success" : "error", errors: { toast: error } };
};
