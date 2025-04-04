import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addExpense } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

const addExpenseSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  amount: z.number().positive(),
  content: z.number().positive().lt(100),
});

export type newExpense = z.infer<typeof addExpenseSchema>;

export const NewExpense = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<newExpense>({ resolver: zodResolver(addExpenseSchema) });

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: addExpense,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
    onMutate: (data) =>
      console.log("called on mutate, optimistic updates here"),
  });

  const onSubmit: SubmitHandler<newExpense> = (data) => {
    mutate({ ...data });
  };

  return (
    <>
      <div className="flex w-120 flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {isError && (
            <div role="alert" className="alert alert-error mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                There was an error adding that expense. Please try again!
              </span>
            </div>
          )}
          {isSuccess && (
            <div role="alert" className="alert alert-success mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Expense Added!</span>
            </div>
          )}
          <div className="flex flex-col items-center gap-2 mt-10">
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
            {!isPending && (
              <button
                className="btn bg-black text-white border-black mt-5"
                type="submit"
              >
                Add Expense
              </button>
            )}
            {isPending && (
              <span className="loading loading-spinner loading-xl"></span>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
