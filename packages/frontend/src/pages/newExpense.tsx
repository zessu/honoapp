import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inputSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  amount: z.number().positive(),
  content: z.number().positive().lt(100),
});

type newExpense = z.infer<typeof inputSchema>;

export const NewExpense = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<newExpense>({ resolver: zodResolver(inputSchema) });

  const onSubmit: SubmitHandler<newExpense> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 mt-10 w-3/4">
          <input
            type="text"
            placeholder="Name"
            className="input"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500">You need to name this expense</p>
          )}
          <textarea
            className="textarea"
            placeholder="Description"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">
              You need to add a description to this expense
            </p>
          )}
          <input
            type="number"
            placeholder="Amount"
            className="input"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-red-500">
              We need to record how much you spent on this expense
            </p>
          )}
          <p>How well do you feel about this expense</p>
          <div className="w-full max-w-xs mt-2">
            <input
              type="range"
              min={0}
              max="100"
              defaultValue="25"
              className="range"
              step="25"
              {...register("content", { valueAsNumber: true })}
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
          <button
            className="btn bg-black text-white border-black mt-5"
            type="submit"
          >
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
};
