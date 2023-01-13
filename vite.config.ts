import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd());

  const getPath = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "~assets": getPath("assets"),
        "~components": getPath("components"),
        "~composables": getPath("composables"),
        "~config": getPath("config.ts"),
        "~plugins": getPath("plugins"),
        "~router": getPath("router"),
        "~services": getPath("services"),
        "~stores": getPath("stores"),
        "~styles": getPath("styles"),
        "~typings": getPath("types"),
        "~utilities": getPath("utilities"),
        "~views": getPath("views"),
      },
    },
  };
});
