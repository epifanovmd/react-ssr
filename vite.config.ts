import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import ssr from "vike/plugin";
import { defineConfig } from "vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { cjsInterop } from "vite-plugin-cjs-interop";

const projectRootDir = path.resolve(__dirname);

dotenv.config({ path: [`.env.${process.env.NODE_ENV}`, ".env"] });

const base_url = process.env.VITE_BASE_URL;

export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: true,
      },
    }),
    ssr(),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: [
        "@force-dev/utils",
        "styled-components",
        "lodash",
        "inversify-inject-decorators",
      ],
    }),
  ],
  resolve: {
    alias: {
      "~@api": path.resolve(projectRootDir, "src/api"),
      "~@common": path.resolve(projectRootDir, "src/common"),
      "~@components": path.resolve(projectRootDir, "src/components"),
      "~@models": path.resolve(projectRootDir, "src/models"),
      "~@service": path.resolve(projectRootDir, "src/service"),
      "~@store": path.resolve(projectRootDir, "src/store"),
      "~@theme": path.resolve(projectRootDir, "src/theme"),
    },
  },
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
