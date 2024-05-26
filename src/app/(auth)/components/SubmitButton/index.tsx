import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  pendingText: string;
  defaultText: string;
}

function SubmitButton({ pendingText, defaultText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"}`}
      disabled={pending}
    >
      {pending ? pendingText : defaultText}
    </button>
  );
}

export default SubmitButton;
