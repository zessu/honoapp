import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/newexpense")({
  beforeLoad: async ({ context }) => {
    if (!context.session) redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/newexpense"!</div>;
}
