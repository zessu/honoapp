import { authClient } from "../lib/auth-client"; //import the auth client
import { z } from "zod";

const userSignUpSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

type userSignup = z.infer<typeof userSignUpSchema>;

const signUp = async ({ email, password }: userSignup) => {
  const { data, error } = await authClient.signIn.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
};

export const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-10 w-3/4">
        <input type="text" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <button className="btn bg-black text-white border-black mt-5">
          Login
        </button>
        <button className="btn btn-link">Or Sign up</button>
      </div>
    </>
  );
};
