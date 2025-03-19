import { useContext, createContext, useState, useEffect } from "react";
import { authClient } from "./lib/auth-client";
import { ReactNode } from "@tanstack/react-router";

type AuthContextType = Awaited<ReturnType<typeof authClient.getSession>>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthContextType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async (): Promise<AuthContextType> => {
      try {
        const data = await authClient.getSession();
        if (data) {
          setSession(data);
          setLoading(false);
        }
      } catch (e) {
        throw new Error("could not grab session");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You need to provide an authentication context");
  }
  return context;
};
