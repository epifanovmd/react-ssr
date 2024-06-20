import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

const base_url = process.env.VITE_BASE_URL;

const config: UserConfig = {
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
};

export default config;
