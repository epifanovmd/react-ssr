import { Config } from "vike/types";

export default {
  passToClient: ["routeParams", "hydrateData", "urlParsed"],
  meta: {
    documentProps: {
      env: { server: true, client: true },
    },
  },
} satisfies Config;
