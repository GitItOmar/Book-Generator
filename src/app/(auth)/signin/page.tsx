"use client";

import Image from "next/image";
import tailwindLogo from "@/public/TailwindUI Logo.svg";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import signInAction from "./actions/signInAction";
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

export default function Signin() {
  const [state, signIn] = useFormState(signInAction, initialState);

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
            Melde dich bei deinem Konto an
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Noch kein Mitglied?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Registriere dich hier
            </Link>
          </p>
        </div>

        <div className="mt-10">
          <div>
            <form action={signIn} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-Mail-Adresse
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </label>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passwort
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="remember-me" className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <span className="ml-3 block text-sm leading-6 text-gray-700">
                    Angemeldet bleiben
                  </span>
                </label>

                <div className="text-sm leading-6">
                  <Link
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Passwort vergessen?
                  </Link>
                </div>
              </div>

              <div>
                <SubmitButton
                  defaultText="Anmelden"
                  pendingText="Anmelden..."
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
