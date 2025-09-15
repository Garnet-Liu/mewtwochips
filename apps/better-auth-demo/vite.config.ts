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
  optimizeDeps: {
    include: ["lucide-react"], // 确保预打包走 ESM
  },
  ssr: {
    noExternal: ["lucide-react"], // SSR 时不要走 CJS
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
