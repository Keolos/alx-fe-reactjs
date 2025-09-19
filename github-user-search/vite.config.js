import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use esbuild for minification (fast + no terser needed)
    minify: "esbuild",
    // Ensures compatibility with most deployments
    outDir: "dist",
    sourcemap: false, // set true if you want debugging in production
  },
  server: {
    port: 5173, // default, but you can change if needed
    open: true, // auto-open browser on dev
  },
});
