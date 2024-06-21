import Image from "next/image";
import tailwindLogo from "@/public/TailwindUI Logo.svg";
import GoogleButton from "./components/GoogleButton";

export default function Signin() {
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
          <p className="mt-2 text-lg leading-6 text-gray-500">
            Erstelle und personalisiere Bücher mit unserer KI-gestützten App
          </p>
        </div>

        <div className="mt-10">
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
