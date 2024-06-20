import { PageContext } from "./types";

export const getTitle = (pageContext: PageContext) => {
  if (pageContext.config) {
    const { title } = pageContext.config;

    if (typeof title === "string") return title;
    if (typeof title === "function") return title(pageContext);
  }

  return import.meta.env.VITE_APP_NAME;
};
