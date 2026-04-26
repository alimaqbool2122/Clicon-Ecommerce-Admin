import { NextResponse } from "next/server";
import ROUTES from "./constants/routes";

export function proxy(req) {
  const { pathname } = req.nextUrl;

  // TOKEN cookie
  const authToken = req.cookies.get("TOKEN")?.value;

  // 1. PROTECTED routes — require authentication
  const protectedRoutes = [
    ROUTES.DASHBOARD,
    ROUTES.ADD_CATEGORY,
    ROUTES.BANNER_LIST,
    ROUTES.ADD_BANNER,
    ROUTES.ADD_PRODUCT,
    ROUTES.ORDER_HISTORY,
    ROUTES.PRODUCTS_LIST,
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Not logged in → redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. AUTH-ONLY routes
  const authOnlyRoutes = [ROUTES.SIGIN, ROUTES.SIGNUP];

  const isAuthOnlyRoute = authOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Already logged in → redirect to home
  if (isAuthOnlyRoute && authToken) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  // Allow everything
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
