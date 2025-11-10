import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes") || pathname.startsWith("/notes/action/create");
    
    if (isPrivateRoute && !token) {
        const url = req.nextUrl.clone();
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
    }
    
    if (isAuthRoute && token) {
        const url = req.nextUrl.clone();
        url.pathname = "/profile";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|images).*)",
  ],
};