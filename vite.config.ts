import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import ssr from "vike/plugin";
import { defineConfig, loadEnv } from "vite";
// @ts-ignore
import { cjsInterop } from "vite-plugin-cjs-interop";

dotenv.config({ path: [`.env.${process.env.NODE_ENV}`, ".env"] });

const base_url = process.env.VITE_BASE_URL;

export default defineConfig({
  plugins: [
    react(),
    ssr(),
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
