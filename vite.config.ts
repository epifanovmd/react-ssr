import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { defineConfig, loadEnv, UserConfig } from "vite";
// @ts-ignore
import { cjsInterop } from "vite-plugin-cjs-interop";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const base_url = process.env.VITE_BASE_URL;

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [
      react(),
      ssr(),
      mdx(),
      cjsInterop({
        // List of CJS dependencies that require interop
        dependencies: [
          "styled-components",
          "lodash",
          "inversify-inject-decorators",
        ],
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: base_url,
          rewrite: path => path.replace("/api", ""),
          changeOrigin: true,
        },
      },
    },
  });
};
