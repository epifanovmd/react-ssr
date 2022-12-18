import { PageContext, VitePageContext } from "./types";

export const beforeRender =
  <T = PageContext>(
    callback: (pageContext: T) => (Partial<T> & Record<string, any>) | void,
  ) =>
  (pageContext: VitePageContext) => {
    const {
      Page,
      pageProps,
      hydrateData,
      exports,
      exportsAll,
      pageExports,
      ...rest
    } = pageContext;

    if (!pageContext.store) {
      return null;
    }

    return callback(rest as any);
  };
