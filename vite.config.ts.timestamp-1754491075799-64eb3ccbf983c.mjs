// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  // Local dev server settings
  server: {
    host: "localhost",
    port: 5173
    // change if you want a custom port
  },
  // Plugins
  plugins: [
    react()
    // includes React SWC compiler for fast builds
    // Add other plugins here
  ],
  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
      // allows import from "@/components/..."
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy50c1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7IC8vIGZvciBSZWFjdCBzdXBwb3J0XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gTG9jYWwgZGV2IHNlcnZlciBzZXR0aW5nc1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICAgIHBvcnQ6IDUxNzMsIC8vIGNoYW5nZSBpZiB5b3Ugd2FudCBhIGN1c3RvbSBwb3J0XG4gIH0sXG5cbiAgLy8gUGx1Z2luc1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSwgLy8gaW5jbHVkZXMgUmVhY3QgU1dDIGNvbXBpbGVyIGZvciBmYXN0IGJ1aWxkc1xuICAgIC8vIEFkZCBvdGhlciBwbHVnaW5zIGhlcmVcbiAgXSxcblxuICAvLyBQYXRoIGFsaWFzZXNcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksIC8vIGFsbG93cyBpbXBvcnQgZnJvbSBcIkAvY29tcG9uZW50cy8uLi5cIlxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUEsRUFFMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBLEVBRVI7QUFBQTtBQUFBLEVBR0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
