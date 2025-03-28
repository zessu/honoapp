import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/api/client";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string(),
  content: z.number(),
  name: z.string(),
});

type expensesReturnType = z.infer<typeof expenseSchema>;

export const Dashboard = () => {
  const { data, isLoading, error } = useQuery<expensesReturnType[]>({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (isLoading)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  if (error)
    return <div>Error loading expenses please try again later ...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item) => (
              <tr key={item.id}>
                <th></th>
                <th>{item.name}</th>
                <td>{item.description}</td>
                <td>{item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
