import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  type AuthResult,
  type User,
} from "../lib/auth";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, confirm: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSessionUser());

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const register = useCallback(async (email: string, password: string, confirm: string) => {
    const result = await registerUser(email, password, confirm);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
