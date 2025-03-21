import { newExpense } from "@/pages/newExpense";

type sendRequestOptions<T> = {
  url: string;
  data: T;
};

const sendRequest = async <T,>(options: sendRequestOptions<T>) => {
  const { url, data } = options;

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export async function addExpense(options: newExpense) {
  return await sendRequest<newExpense>({
    url: "api/expenses/newExpense",
    data: options,
  });
}
