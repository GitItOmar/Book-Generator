import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth((req) => {
  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except those starting with /auth
    "/((?!auth).*)",
  ],
};
