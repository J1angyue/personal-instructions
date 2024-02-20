import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/intro/mzx",
  build: {
    outDir: "dist-intro-mzx",
    rollupOptions: {
      output: {
        manualChunks: {
          threejs: ["three"],
          postprocessing: ["postprocessing"],
        },
      },
    },
  },
  plugins: [compression()],
});
