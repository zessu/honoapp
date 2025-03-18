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
      <div className="p-2 flex gap-2 py-5 justify-between">
        <div className="ml-5">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
        </div>
        <div className="mr-5 flex gap-4">
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <Link to="/signup" className="[&.active]:font-bold">
            Sign up
          </Link>
          <Link to="/expenses" className="[&.active]:font-bold">
            All Expenses
          </Link>
          <Link to="/newexpense" className="[&.active]:font-bold">
            New Expense
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex flex-col items-center h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
