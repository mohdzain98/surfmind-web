import { createContext, useContext } from "react";
import type { LoginResponse } from "./api";

export type AdminSession = Pick<LoginResponse, "token" | "expiresAt">;

export type AdminAuthValue = {
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
};

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth(): AdminAuthValue {
  const value = useContext(AdminAuthContext);
  if (!value)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return value;
}
