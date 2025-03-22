import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewExpense } from "@/pages/newExpense";

export const Route = createFileRoute("/newexpense")({
  beforeLoad: async ({ context }) => {
    if (!context.session.session.data) {
      return redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <NewExpense />;
}
