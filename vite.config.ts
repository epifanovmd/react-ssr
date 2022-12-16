import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [react(), ssr()],
  ssr: {
    format: "cjs",
  },
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
