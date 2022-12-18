import React from "react";
import ReactDOMServer from "react-dom/server";
import type { PageContextServer } from "./types";
import { PageShell } from "./PageShell";
import { ServerStyleSheet } from "styled-components";
import { createStore } from "../store";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr";

export const passToClient = ["routeParams", "hydrateData"];

export const render = async (pageContext: PageContextServer) => {
  const store = createStore();
  const sheet = new ServerStyleSheet();

  await pageContext.exports.onBeforeRender?.({
    ...pageContext,
    store,
  });

  const pageHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(<PageShell {...pageContext} store={store} />),
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
      hydrateData: store.dehydrate() || {},
    },
  };
};
