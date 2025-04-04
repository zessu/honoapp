import { useAuth } from "@/authContext";
import {
  Outlet,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type MyAuthContext = { session: any };

export const Route = createRootRouteWithContext<MyAuthContext>()({
  component: () => RootComponent(),
  notFoundComponent: () => <div>Can't find the page you are looking for</div>,
});

function RootComponent() {
  const { session } = useAuth();
  return (
    <>
      <div className="p-2 py-4 flex justify-between">
        <div>
          <Link to="/" className="[&.active]:font-bold mr-2">
            All expenses
          </Link>{" "}
          <Link to="/newexpense" className="[&.active]:font-bold">
            New Expense
          </Link>
        </div>
        {session?.data?.user && (
          <div className="avatar cursor-pointer">
            <div className="w-8 rounded-full">
              <img
                src={session?.data?.user?.image}
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="flex flex-col items-center h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
