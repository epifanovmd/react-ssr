import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

const config: UserConfig = {
  plugins: [
    react(),
    ssr(),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: ["styled-components", "lodash"],
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
