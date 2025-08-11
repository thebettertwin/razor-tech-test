import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/razor-tech-test/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@api": path.resolve(__dirname, "src/api"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
}));
