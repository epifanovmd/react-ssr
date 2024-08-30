import { PageContext } from "./types";

export const beforeRender =
  <T = PageContext>(
    callback: (pageContext: T) => (Partial<T> & Record<string, never>) | void,
  ) =>
  (pageContext: PageContext) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Page,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pageProps,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hydrateData,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exports,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exportsAll,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pageExports,
      ...rest
    } = pageContext;

    if (!pageContext.store) {
      return null;
    }

    return callback(rest as never);
  };
