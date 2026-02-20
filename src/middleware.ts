import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except the login page itself
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("everestics_admin");
    const token = process.env.ADMIN_SESSION_TOKEN;

    if (!token || !session || session.value !== token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
