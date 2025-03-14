import { authClient } from "../lib/auth-client"; //import the auth client
import { z } from "zod";

const userSignUpSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

type userSignup = z.infer<typeof userSignUpSchema>;

const signUp = async ({ email, password, name }: userSignup) => {
  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      image, // user image url (optional)
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

export const SignUp = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-10 w-3/4">
        <input type="text" placeholder="Name" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
        />
        <button className="btn bg-black text-white border-black mt-5">
          Sign up
        </button>
        <button className="btn btn-link">Or Login</button>
      </div>
    </>
  );
};
