import type { NextRequest } from "next/server";
import { AUTH_PAGE } from "./utils/routes";
import {
  checkValidityHash,
  getSearchParams,
} from "./utils/contexts/authContenxt";

export function middleware(request: NextRequest) {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);

  const authData = getSearchParams(searchParams);

  const hashIsValid = checkValidityHash(authData);

  if (!hashIsValid) {
    return Response.redirect(new URL(AUTH_PAGE, request.url));
  }
}

export const config = {
  matcher: ["/"],
};
