import { newExpense } from "@/pages/newExpense";

export async function addExpense(options: newExpense) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/expenses/newExpense`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    }
  );
  return response;
}
