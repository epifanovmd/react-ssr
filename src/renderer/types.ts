import { ReactElement } from "react";
import type { PageContextBuiltIn } from "vite-plugin-ssr";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";
import type { i18n, Resource } from "i18next";
export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

type PageProps = {}
type Page = (pageProps: PageProps) => ReactElement

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps
  urlPathname: string
  locale: string;
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
  i18n: i18n;
  i18nStore: Resource;
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer
