// vite.config.ts
import { defineConfig } from "file:///D:/study/songmok/TeamTheGenius_Web/node_modules/vite/dist/node/index.js";
import react from "file:///D:/study/songmok/TeamTheGenius_Web/node_modules/@vitejs/plugin-react-swc/index.mjs";
import WindiCSS from "file:///D:/study/songmok/TeamTheGenius_Web/node_modules/vite-plugin-windicss/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\study\\songmok\\TeamTheGenius_Web";
var vite_config_default = defineConfig({
  assetsInclude: ["/sb-preview/runtime.js"],
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
      { find: "@pages", replacement: path.resolve(__vite_injected_original_dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__vite_injected_original_dirname, "src/components")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxzdHVkeVxcXFxzb25nbW9rXFxcXFRlYW1UaGVHZW5pdXNfV2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxzdHVkeVxcXFxzb25nbW9rXFxcXFRlYW1UaGVHZW5pdXNfV2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9zdHVkeS9zb25nbW9rL1RlYW1UaGVHZW5pdXNfV2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgV2luZGlDU1MgZnJvbSBcInZpdGUtcGx1Z2luLXdpbmRpY3NzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYXNzZXRzSW5jbHVkZTogW1wiL3NiLXByZXZpZXcvcnVudGltZS5qc1wiXSxcbiAgcGx1Z2luczogW3JlYWN0KCksIFdpbmRpQ1NTKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogXCJAXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSB9LFxuICAgICAgeyBmaW5kOiBcIkBwYWdlc1wiLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcGFnZXNcIikgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogXCJAY29tcG9uZW50c1wiLFxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUyxTQUFTLG9CQUFvQjtBQUM3VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixlQUFlLENBQUMsd0JBQXdCO0FBQUEsRUFDeEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7QUFBQSxFQUM3QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUN6RCxFQUFFLE1BQU0sVUFBVSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUNwRTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
