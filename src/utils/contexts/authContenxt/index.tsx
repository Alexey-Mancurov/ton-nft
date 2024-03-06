import { createContext, useContext, useEffect, useState } from "react";
import { AuthData, AuthProviderProps, IAuthContext } from "./types";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { AUTH_PAGE, ROOT_PAGE } from "@/utils/constants/routes";

const cookies = new Cookies(null, { path: ROOT_PAGE });

export const AUTH_COOKIES = "authHash";
const WEEK_TIME = 60 * 60 * 24 * 7 * 1000;

const AuthContext = createContext({});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthData | null>();

  useEffect(() => {
    const authData = getSearchParams(router.asPath);
    setAuth(authData);
  }, [router]);

  useEffect(() => {
    if (auth?.hash) {
      const expireTime =
        (Number(auth?.auth_date) * 1000 || new Date().getTime()) + WEEK_TIME;

      cookies.set(AUTH_COOKIES, auth.hash, { expires: new Date(expireTime) });
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    cookies.remove(AUTH_COOKIES);
    router.replace(AUTH_PAGE);
  };

  const value = { auth, setAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContext");
  }

  return { ...context } as IAuthContext;
};

function getSearchParams(asPath: string) {
  const searchParams = new URLSearchParams(asPath.replace("/", ""));

  const id = Number(searchParams.get("id"));
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const username = searchParams.get("username");
  const photo_url = searchParams.get("photo_url");
  const auth_date = Number(searchParams.get("auth_date"));
  const hash = searchParams.get("hash");

  return { id, first_name, last_name, username, photo_url, auth_date, hash };
}

export { AuthProvider, useAuth };
