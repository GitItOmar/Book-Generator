"use client";

import React, { useId } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  error?: string;
  autoComplete?: string;
}

function InputField({
  id,
  name,
  type,
  label,
  error = "",
  autoComplete = "",
}: Readonly<InputFieldProps>) {
  const errorId = useId();

  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
      <div className="mt-2 relative">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${error ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"} sm:text-sm sm:leading-6`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={errorId}>
          {error}
        </p>
      )}
    </label>
  );
}

export default InputField;
