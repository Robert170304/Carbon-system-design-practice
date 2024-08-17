// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const currentPath = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value; // Example: check for a token in cookies
  if (
    typeof currentPath === "string" &&
    (currentPath.includes("login") || currentPath.includes("register")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    typeof currentPath === "string" &&
    !token &&
    !currentPath.includes("login") &&
    !currentPath.includes("register")
  ) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Continue if authenticated
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
