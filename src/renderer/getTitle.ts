import { PageContext } from "./types";

export const getTitle = (pageContext: PageContext) => {
  const { title } = pageContext.config;

  if (!title) return import.meta.env.PUBLIC_ENV__APP_NAME;
  if (typeof title === "string") return title;
  if (typeof title === "function") return title(pageContext);
};
