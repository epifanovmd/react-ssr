import { PageContext } from "./types";

export const beforeRender =
  (callback: (pageContext: PageContext) => any) =>
  (pageContext: PageContext) => {
    if (!pageContext.store) {
      return null;
    }

    return callback(pageContext);
  };
