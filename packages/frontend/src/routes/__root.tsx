import {
  Outlet,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type MyAuthContext = { session: any };

export const Route = createRootRouteWithContext<MyAuthContext>()({
  component: () => RootComponent(),
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 py-5">
        <Link to="/" className="[&.active]:font-bold">
          All expenses
        </Link>{" "}
        <Link to="/newexpense" className="[&.active]:font-bold">
          New Expense
        </Link>
      </div>
      <hr />
      <div className="flex flex-col items-center h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
