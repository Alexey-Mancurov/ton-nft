import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  auth: AuthData;
  setAuth: Dispatch<SetStateAction<AuthData | undefined>>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthData {
  hash: string | null;
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  photo_url: string | null;
  auth_date: number | null;
}
