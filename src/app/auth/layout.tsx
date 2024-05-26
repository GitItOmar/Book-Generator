import Image from "next/image";
import heroImage from "@/public/README.avif";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1">
      {children}
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
