import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiBaseUrl = env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is not defined in the environment.");
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: apiBaseUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
