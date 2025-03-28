import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!context.session.session.data.user) {
      return redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Welcome to the dashboard</div>;
}
