import { useContext, createContext, useState, useEffect } from "react";
import { authClient } from "./lib/auth-client";
import { ReactNode } from "@tanstack/react-router";

type getSession = Awaited<ReturnType<typeof authClient.getSession>>;
type googleSignIn = Awaited<ReturnType<typeof authClient.signIn.social>>;

type AuthContextType = {
  session: getSession;
  signIn: googleSignIn;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<getSession | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async (): Promise<getSession> => {
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

  const googleSignIn = async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: import.meta.env.VITE_APP_BASE_URL,
    });
  };

  return (
    <AuthContext.Provider value={{ session, signIn: googleSignIn }}>
      {loading ? (
        <div className="text-red border-1 border-white flex flex-row gap-2 items-center justify-center h-screen">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          <div>Loading your data ...</div>
        </div>
      ) : (
        children
      )}
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
