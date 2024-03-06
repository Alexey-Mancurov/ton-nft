import { createContext, useContext, useEffect, useState } from "react";
import { AuthData, AuthProviderProps, IAuthContext } from "./types";
import { useRouter } from "next/router";
import { AUTH_PAGE } from "@/utils/routes";
import sha256 from "crypto-js/sha256";
import hmacSHA256 from "crypto-js/hmac-sha256";

const AuthContext = createContext({});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthData | null>();

  useEffect(() => {
    const searchParams = new URLSearchParams(router.asPath.replace("/", ""));
    const authData = getSearchParams(searchParams);
    setAuth(authData);
  }, [router]);

  const logout = () => {
    setAuth(null);
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

function getSearchParams(searchParams: URLSearchParams) {
  const id = Number(searchParams.get("id"));
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const username = searchParams.get("username");
  const photo_url = searchParams.get("photo_url");
  const auth_date = Number(searchParams.get("auth_date"));
  const hash = searchParams.get("hash");

  return { id, first_name, last_name, username, photo_url, auth_date, hash };
}

function checkValidityHash(auth: AuthData) {
  const data_check_string = `auth_date=${auth.auth_date}\nfirst_name=${auth.first_name}\nid=${auth.id}\nlast_name=${auth.last_name}\nphoto_url=${auth.photo_url}\nusername=${auth.username}`;

  const secret_key = sha256(process.env.BOT_TOKEN as string);
  const hmacHash = hmacSHA256(data_check_string, secret_key);

  return auth.hash === hmacHash.toString()
}

export { AuthProvider, useAuth, getSearchParams, checkValidityHash };
