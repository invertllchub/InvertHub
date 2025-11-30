import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role  = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/Login", "/not-authorized"];

  if (publicPaths.includes(pathname)) {
    if (token && pathname === "/Login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (!role) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  const NOT_ALLOWED_PAGES: Record<string, string[]> = {
    User: ["/dashboard/users", "/dashboard/users/add"], 
    Admin: [],  
  };

  const blockedPages = NOT_ALLOWED_PAGES[role] || [];
  const isBlocked = blockedPages.some((path) => pathname.startsWith(path));

  if (isBlocked) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/Login", "/not-authorized"],
};
