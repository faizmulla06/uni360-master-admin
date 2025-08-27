import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "es2020",
    sourcemap: false,
    minify: false, // Disable minification completely to avoid variable hoisting issues
    rollupOptions: {
      output: {
        format: "es",
        // Use a simple chunking strategy
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          state: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
