import { ReactElement } from "react";
import { PageContextUrlComputedPropsClient } from "vike/dist/esm/shared/addUrlComputedProps";
import { PageContextClientWithServerRouting } from "vike/dist/esm/shared/types";
import type {
  PageContextClientWithServerRouting as VPageContextClient,
  PageContextServer as VPageContextServer,
} from "vike/types";

import { AppStore } from "../store";

export type { DocumentProps };
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
    documentProps?: DocumentProps;
    onBeforeRender?: OnBeforeRender;
  };

  store: AppStore;
  hydrateData: Record<string, any>;
};

type DocumentProps = { title?: string; description?: string };
type OnBeforeRender = (pageContext: PageContext) => Promise<AppStore>;

type PageContextServer = VPageContextServer<Page> & PageContextCustom;
type PageContextClient = VPageContextClient<Page> & PageContextCustom;

type VitePageContext = PageContextClient | PageContextServer;

type PageContext<
  QueryParams = Record<string, string>,
  RouteParams = Record<string, string>,
  PageContextCustom = Record<string, any>,
> = Omit<
  VitePageContext,
  // client unused
  | "Page"
  | "pageProps"
  | "hydrateData"
  | "exports"
  | "exportsAll"
  | "pageExports"
  // redefine
  | "routeParams"
  | "urlParsed"
> & {
  routeParams: RouteParams;
  urlParsed: Omit<
    PageContextUrlComputedPropsClient["urlParsed"],
    "search" | "searchAll"
  > & {
    search: Partial<QueryParams>;
    searchAll: Partial<
      Record<keyof QueryParams, QueryParams[keyof QueryParams][]>
    >;
  };
} & PageContextCustom;
