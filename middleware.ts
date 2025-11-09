import { NextResponse } from "next/server"
import type { NextRequest } from "next/server";


export function middleware (req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        const loginUrl = new URL("/Login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (token && req.nextUrl.pathname === "/Login") {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/Login"],
};



