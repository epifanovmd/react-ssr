import { PageContext } from "./types";

export const getDescription = (pageContext: PageContext) => {
  if (pageContext.config) {
    const { description } = pageContext.config;

    if (typeof description === "string") return description;
    if (typeof description === "function") return description(pageContext);
  }

  return import.meta.env.PUBLIC_ENV__APP_DESCRIPTION;
};
