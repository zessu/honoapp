import { createAuthClient } from "better-auth/react";
import { z } from "zod";

const userSignUpSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

type userSignup = z.infer<typeof userSignUpSchema>;

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const isAuthenticated = async () => {
  const { data: session } = await authClient.useSession();
  console.log(session);
  return session;
};

export const signUpWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:5173",
  });
  console.log(data);
  return data;
};

export const signUpWithEmail = async ({
  email,
  password,
  name,
}: userSignup) => {
  return await authClient.signUp.email(
    {
      email,
      password,
      name,
      callbackURL: "/dashboard",
    },
    {
      onSuccess: () => {
        alert("you have successfully logged in");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    }
  );
};
