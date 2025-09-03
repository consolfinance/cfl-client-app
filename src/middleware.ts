import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./utils/publicRoutes";

const redirectableRoutes = [
  "/credit-builder-loan",
  "/growth-loan",
  "/business-step-up-loan",
  "/business-boost-loan",
  "/trade-finance-loan",
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const token = req.cookies.get("token")?.value;

  const isPublic = publicRoutes.some((pattern) => pattern.test(pathname));

  // ✅ 1. Redirect specific routes to /apply
  if (redirectableRoutes.includes(pathname) && !pathname.endsWith("/apply")) {
    url.pathname = `${pathname}/apply`;
    return NextResponse.redirect(url);
  }

  // ✅ 2. Allow public API routes early
  if (pathname.startsWith("/api/") && isPublic) {
    return NextResponse.next();
  }

  // ✅ 3. Block API routes with bad referer (except auth callback)
  if (
    pathname.startsWith("/api/") &&
    !req.headers
      .get("referer")
      ?.includes(process.env.NEXT_PUBLIC_APP_URL as string) &&
    !pathname.startsWith("/api/auth/callback")
  ) {
    return NextResponse.json(
      { message: "Unauthorised. from middleware" },
      { status: 401 }
    );
  }

  // ✅ 4. Require token for protected routes
  if (!token && !isPublic && !pathname.startsWith("/auth")) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
