import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {  tokenName } from "./Constants";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // const isLoggedIn = getSessionData(tokenName);
// console.log(isLoggedIn)
if (path.split("/")[1] !== "auth" && !request.cookies.has(tokenName)) {
  return NextResponse.redirect(new URL("/auth/login?", request.url));
  }
  if (path.split("/")[1] === "auth" && request.cookies.has(tokenName)) {
    return NextResponse.redirect(new URL(`/en/dashboard`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
