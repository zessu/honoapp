import { useAuth } from "../authContext";

export const NewExpense = () => {
  const context = useAuth();
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-10 w-3/4">
        <input type="text" placeholder="Name" className="input" />
        <textarea className="textarea" placeholder="Description"></textarea>
        <input type="text" placeholder="Amount" className="input" />
        <p>How well do you feel about this expense</p>
        <div className="w-full max-w-xs mt-2">
          <input
            type="range"
            min={0}
            max="100"
            defaultValue="25"
            className="range"
            step="25"
          />
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        <button className="btn bg-black text-white border-black mt-5">
          Add Expense
        </button>
      </div>
    </>
  );
};
