import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS(), VueDevTools()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "."),
      "@": resolve(__dirname, "./src"),
      "@bernankez/theme-generator": resolve(__dirname, "../src/index.ts"),
    },
  },
});
