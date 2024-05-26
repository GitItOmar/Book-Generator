"use client";

import Image from "next/image";
import tailwindLogo from "@/public/TailwindUI Logo.svg";
import { useFormState } from "react-dom";
import InputField from "@/components/InputField";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import createUserAction from "./actions/createUserAction";
import SubmitButton from "../components/SubmitButton";
import GoogleSigninButton from "../components/GoogleSigninButton";

const initialState = {
  message: "",
  errors: {
    email: "",
    password: "",
    toast: "",
  },
};

export default function Signup() {
  const [state, createUser] = useFormState(createUserAction, initialState);

  useEffect(() => {
    if (state.message === "error" && state.errors?.toast) {
      toast.error(state.errors.toast);
    }
  }, [state]);

  return (
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
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Bereits ein Mitglied?{" "}
            <Link
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Melde dich an
            </Link>
          </p>
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
                <SubmitButton
                  defaultText="Registrieren"
                  pendingText="Registrieren..."
                />
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

            <GoogleSigninButton />
          </div>
        </div>
      </div>
    </div>
  );
}
