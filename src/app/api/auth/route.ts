import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/firebase";

export async function GET() {
  const session = cookies().get("session")?.value ?? "";

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await verifySessionCookie(session);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
