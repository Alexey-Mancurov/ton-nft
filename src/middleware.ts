import type { NextRequest } from "next/server";
import { AUTH_PAGE, ROOT_PAGE } from "./utils/constants/routes";
import { AUTH_COOKIES } from './utils/contexts/authContenxt';

export function middleware(request: NextRequest) {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const authHashCookies = request.cookies.get(AUTH_COOKIES)?.value;

  if (authHashCookies && request.nextUrl.pathname !== ROOT_PAGE) {
    return Response.redirect(new URL(ROOT_PAGE, request.url));
  }

  const authHash = searchParams.get("hash");

  if (!authHash && !authHashCookies) {
    return Response.redirect(new URL(AUTH_PAGE, request.url));
  }
}

export const config = {
  matcher: ["/"],
};
