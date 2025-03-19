import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth, AuthProvider } from "./authContext";

import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, context: { session: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthenticatedUser() {
  const session = useAuth();
  return <RouterProvider router={router} context={{ session }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <AuthenticatedUser />
      </AuthProvider>
    </StrictMode>
  );
}
