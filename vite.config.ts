import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

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
        target: "http://jsonplaceholder.typicode.com/",
        rewrite: path => path.replace("/api", ""),
        changeOrigin: true,
      },
    },
  },
};

export default config;
