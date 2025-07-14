// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // for React support
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Local dev server settings
  server: {
    host: "localhost",
    port: 5173, // change if you want a custom port
  },

  // Plugins
  plugins: [
    react(), // includes React SWC compiler for fast builds
    // Add other plugins here
  ],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // allows import from "@/components/..."
    },
  },
});
