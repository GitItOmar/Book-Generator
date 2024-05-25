"use client";

import Image from "next/image";
import tailwindLogo from "@/public/TailwindUI Logo.svg";
import heroImage from "@/public/README.avif";
import { useFormState, useFormStatus } from "react-dom";
import InputField from "@/components/InputField";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { googleSignUp } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import createUserAction from "./actions/createUserAction";

const initialState = {
  message: "",
  errors: {
    email: "",
    password: "",
    toast: "",
  },
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"}`}
      disabled={pending}
    >
      {pending ? "Registrieren..." : "Registrieren"}
    </button>
  );
}

export default function Signup() {
  const [state, createUser] = useFormState(createUserAction, initialState);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    const { success, error } = await googleSignUp();

    if (success) {
      router.push("/");
    }

    toast.error(error);
  };

  useEffect(() => {
    if (state.message === "success") {
      router.push("/");
    }

    if (state.message === "error" && state.errors?.toast) {
      toast.error(state.errors.toast);
    }
  }, [state, router]);

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              className="h-10 w-auto"
              src={tailwindLogo}
              alt="Your Company"
              height={40}
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Erstelle ein Konto
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form action={createUser} className="space-y-6">
                <div>
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="E-Mail-Adresse"
                    error={state.errors?.email}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Passwort"
                    error={state.errors?.password}
                    autoComplete="current-password"
                  />
                </div>

                <div>
                  <Submit />
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Oder weiter mit
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src={heroImage}
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
          fill
        />
      </div>
    </div>
  );
}
