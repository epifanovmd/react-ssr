import ReactDOMServer from "react-dom/server";
import React from "react";
import fetch from "node-fetch";
import { I18nextProvider } from "react-i18next";
import { PageShell } from "./PageShell";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr";
import type { PageContextServer } from "./types";
import { ServerStyleSheet } from "styled-components";
import { IUserListVM } from "../components";

export const passToClient = [
  "pageProps",
  "locale",
  "query",
  "i18nStore",
  "routeParams",
];

export const render = (pageContext: PageContextServer) => {
  const { exports, locale, i18n, urlPathname } = pageContext;
  const sheet = new ServerStyleSheet();

  const pageHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <I18nextProvider i18n={i18n}>
        <PageShell {...pageContext} />
      </I18nextProvider>,
    ),
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc = (documentProps && documentProps.description) || "App using Vite + vite-plugin-ssr";
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
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
};
