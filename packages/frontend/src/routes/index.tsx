import { createFileRoute, redirect } from "@tanstack/react-router";
import { Dashboard } from "@/pages/dashboard";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!context.session?.data?.user) {
      return redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mt-10">
      <Dashboard />
    </div>
  );
}
