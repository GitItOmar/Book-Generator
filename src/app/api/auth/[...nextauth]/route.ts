import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "@/lib/mongodb";

const {
  NEXTAUTH_SECRET = "",
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
} = process.env;

if (!NEXTAUTH_SECRET) {
  throw new Error(
    "Please define the NEXTAUTH_SECRET environment variable inside .env.local"
  );
}

if (!GOOGLE_CLIENT_ID) {
  throw new Error(
    "Please define the GOOGLE_CLIENT_ID environment variable inside .env.local"
  );
}

if (!GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Please define the GOOGLE_CLIENT_SECRET environment variable inside .env.local"
  );
}

const handler = NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
