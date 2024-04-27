import { Config } from "vike/types";

export default {
  passToClient: ["routeParams", "hydrateData", "urlParsed"],
  meta: {
    title: {
      // Make the value of `title` available on both the server- and client-side
      env: { server: true, client: true },
    },
    description: {
      // Make the value of `description` available only on the server-side
      env: { server: true },
    },
  },
  clientRouting: true,
} satisfies Config;
