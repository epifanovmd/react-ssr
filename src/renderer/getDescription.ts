import { PageContext } from "./types";

export const getDescription = (pageContext: PageContext) => {
  const { description } = pageContext.config;

  if (!description) return import.meta.env.PUBLIC_ENV__APP_DESCRIPTION;
  if (typeof description === "string") return description;
  if (typeof description === "function") return description(pageContext);
};
