import { ReactElement } from "react";
import type { PageContextBuiltIn } from "vite-plugin-ssr";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";
import type { i18n, Resource } from "i18next";
import { AppStore } from "../store";
import { ParsedQuery } from "query-string";

export type { DocumentProps };
export type { OnBeforeRender };
export type { PageContext };
export type { PageContextServer };
export type { PageContextClient };
export type { PageProps };

type PageProps = {};
type Page = (pageProps: PageProps) => ReactElement;

type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;

  urlPathname: string;
  locale: string;
  query: ParsedQuery;

  exports: {
    documentProps?: DocumentProps;
    onBeforeRender?: OnBeforeRender;
  };

  i18n: i18n;
  i18nStore: Resource;

  store: AppStore;
  hydrateData: Record<string, any>;
};

type DocumentProps = { title?: string; description?: string };
type OnBeforeRender = (pageContext: PageContext) => Promise<AppStore>;

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
