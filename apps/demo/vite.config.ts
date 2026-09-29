import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/react-datekit/" : "./",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      {
        find: "react-datekit/style.css",
        // Point directly at source CSS so Vite HMR picks up changes without a build
        replacement: resolve(
          import.meta.dirname,
          "../../packages/react-datekit/src/styles/datepicker.css",
        ),
      },
      {
        find: "react-datekit",
        replacement: resolve(
          import.meta.dirname,
          "../../packages/react-datekit/src/index.ts",
        ),
      },
    ],
  },
  server: {
    port: 5173,
    open: false,
    fs: {
      allow: ["../.."],
    },
  },
});
