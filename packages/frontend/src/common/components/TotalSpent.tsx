import { useState, useEffect } from "react";

export const TotalSpent = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalExpenses() {
      const res = await fetch("/api/expenses/totalExpenses");
      const data = await res.json();
      setTotalSpent(data.amount);
    }
    fetchTotalExpenses();
  }, []);

  return (
    <div className="card bg-slate-900 text-primary-content w-96 h-30 mt-10">
      <div className="card-body">
        <h2 className="card-title">Total Monthly Spend</h2>
        {totalSpent ? (
          <p>{totalSpent}</p>
        ) : (
          <p>Could not fetch your total at the moment, try again later</p>
        )}
      </div>
    </div>
  );
};
