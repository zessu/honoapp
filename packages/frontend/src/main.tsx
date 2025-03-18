import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { authClient } from "./lib/auth-client";

import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, context: { session: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthenticatedUser() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session } = await authClient.getSession();
        console.log(session);
        if (session) setSession(session);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (isLoading) return <div>Logging you in ! Wait a second</div>;
  return <RouterProvider router={router} context={{ session }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthenticatedUser></AuthenticatedUser>
    </StrictMode>
  );
}
