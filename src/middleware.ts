import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const responseAPI = await fetch(
    `${req.nextUrl.origin}/auth/is-authenticated`
  );

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/user/:path*",
};
