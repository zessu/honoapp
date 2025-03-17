import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const signUpWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:5173",
  });
  console.log(data);
  return data;
};
