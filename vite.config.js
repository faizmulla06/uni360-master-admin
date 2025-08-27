import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@headlessui/react", "@heroicons/react", "framer-motion"],
          charts: ["chart.js", "react-chartjs-2"],
          redux: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
