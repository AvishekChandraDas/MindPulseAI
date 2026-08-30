import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Fast-path protection for dashboard pages. The dashboard layout performs the
 * authoritative database-session validation; this only avoids rendering a
 * protected route when no Auth.js session cookie is present.
 */
export function middleware(request: NextRequest) {
  const hasSessionCookie = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
  ].some((name) => request.cookies.has(name));

  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
