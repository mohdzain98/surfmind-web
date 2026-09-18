import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AdminApiError, adminRequest, loginAdmin } from "./api";
import {
  AdminAuthContext,
  type AdminAuthValue,
  type AdminSession,
} from "./adminAuth";

const SESSION_KEY = "surfmind-admin-session";

function readSession(): AdminSession | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (
      !session.token ||
      !session.expiresAt ||
      new Date(session.expiresAt).getTime() <= Date.now()
    ) {
      window.sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export default function AdminAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<AdminSession | null>(readSession);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await loginAdmin(username, password);
    const nextSession = {
      token: response.token,
      expiresAt: response.expiresAt,
    };
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  useEffect(() => {
    if (!session) return undefined;
    const remaining = new Date(session.expiresAt).getTime() - Date.now();
    const timer = window.setTimeout(logout, Math.max(0, remaining));
    return () => window.clearTimeout(timer);
  }, [logout, session]);

  const request = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      if (!session) throw new AdminApiError("Admin login required", 401);
      try {
        return await adminRequest<T>(session.token, path, init);
      } catch (error) {
        if (error instanceof AdminApiError && error.status === 401) logout();
        throw error;
      }
    },
    [logout, session]
  );

  const value = useMemo<AdminAuthValue>(
    () => ({ authenticated: Boolean(session), login, logout, request }),
    [login, logout, request, session]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
