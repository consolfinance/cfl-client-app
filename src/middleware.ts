import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./utils/publicRoutes";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const token = req.cookies.get("token")?.value;

  const isPublic = publicRoutes.some((pattern) => pattern.test(pathname));

  // ✅ Allow public API routes early
  // disabled for now as we are not forcing authentication.

  if (pathname.startsWith("/api/") && isPublic) {
    return NextResponse.next();
  }

  // ❌ Block API routes not coming from trusted referer (except auth callback)
  if (
    pathname.startsWith("/api/") &&
    !req.headers
      .get("referer")
      ?.includes(process.env.NEXT_PUBLIC_APP_URL as string) &&
    !pathname.startsWith("/api/auth/callback")
  ) {
    return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  }

  // 🔐 Require token for protected routes
  // disabled for now as we are not forcing authentication.
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
