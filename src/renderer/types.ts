import { ReactElement } from "react";
import type {
  PageContextClientWithServerRouting as VPageContextClient,
  PageContextServer as VPageContextServer,
  Url,
} from "vike/types";

import { AppStore } from "../store";

export type { OnBeforeRender };
export type { PageContext };
export type { PageContextServer };
export type { PageContextClient };
export type { PageProps };
export type { VitePageContext };

type PageProps = {};
type Page = (pageProps: PageProps) => ReactElement;

type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;

  urlPathname: string;

  exports: {
    onBeforeRender?: OnBeforeRender;
  };

  store: AppStore;
  hydrateData: Record<string, any>;
};

type OnBeforeRender = (pageContext: PageContext) => Promise<AppStore>;

type PageContextServer = VPageContextServer<Page> & PageContextCustom;
type PageContextClient = VPageContextClient<Page> & PageContextCustom;

type VitePageContext = PageContextClient | PageContextServer;

type PageContext<
  QueryParams = Record<string, string>,
  RouteParams = Record<string, string>,
  PageContextCustom = Record<string, any>,
> = VitePageContext & {
  routeParams: RouteParams;
  urlParsed: Omit<Url, "search" | "searchAll"> & {
    search: Partial<QueryParams>;
    searchAll: Partial<
      Record<keyof QueryParams, QueryParams[keyof QueryParams][]>
    >;
  };
} & PageContextCustom;
