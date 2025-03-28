import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/api/client";

export const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (isLoading)
    return (
      <div className="flex w-52 flex-col gap-4 mt-10">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  if (error)
    return <div>Error loading expenses please try again later ...</div>;

  return <>Welcome to the dash</>;
};
