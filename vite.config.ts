import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import WindiCSS from "vite-plugin-windicss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["/sb-preview/runtime.js"],
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
});
