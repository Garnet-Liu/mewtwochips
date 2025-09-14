import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import * as path from "node:path";

export default defineConfig({
  plugins: [vike(), react(), tailwindcss()],
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"), // 或 apps/better-auth-demo/src
    },
  },
});
