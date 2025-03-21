import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiBaseUrl = env.VITE_API_BASE_URL;
  console.log(env);

  if (!apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is not defined in the environment.");
  }

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/common/components"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
  };
});
