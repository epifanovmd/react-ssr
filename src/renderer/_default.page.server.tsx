import ReactDOMServer from "react-dom/server";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { PageShell } from "./PageShell";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr";
import type { PageContextServer } from "./types";
import { ServerStyleSheet } from "styled-components";
import { createStore } from "../store";

export const passToClient = [
  "pageProps",
  "locale",
  "query",
  "i18nStore",
  "routeParams",
  "hydrateData",
];

export const render = async (pageContext: PageContextServer) => {
  const { i18n } = pageContext;

  const store = createStore();
  const sheet = new ServerStyleSheet();
  const prefetchStore = await pageContext.exports.onBeforeRender?.({
    ...pageContext,
    store,
  });

  const pageHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <I18nextProvider i18n={i18n}>
        <PageShell {...pageContext} store={store} />
      </I18nextProvider>,
    ),
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";
  const styles = sheet.getStyleTags();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(styles)}
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      hydrateData: prefetchStore?.dehydrate() || {},
    },
  };
};
