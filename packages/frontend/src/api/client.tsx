import { type newExpense } from "@/pages/newExpense";

type sendRequestOptions<T> = {
  url: string;
  data?: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

const sendRequest = async <T,>(options: sendRequestOptions<T>) => {
  const { url, data } = options;

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${url}`, {
    method: options.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
};

export async function addExpense(options: newExpense) {
  return await sendRequest<newExpense>({
    url: "api/expenses/newExpense",
    data: options,
    method: "POST",
  });
}

export async function getExpenses() {
  return await sendRequest({
    url: "api/expenses/expenses",
    method: "GET",
  });
}
