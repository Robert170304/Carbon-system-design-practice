// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("🚀 ~ middleware ~ req:", req.cookies);
  const token = req.cookies.token; // Example: check for a token in cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Continue if authenticated
}

// Protect specific routes in next.config.js
export const config = {
  matcher: ["/user-management"], // Define routes to protect
};
